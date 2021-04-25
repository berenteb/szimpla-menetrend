const cheerio = require("cheerio");
const https = require("https");
var host = "szkt.hu"
function getFeed() {
    return new Promise((resolve, reject) => {
        var req = https.request({ hostname: host, path: "/hirek" }, (response) => {
            var str = "";
            response.on('data', (chunk) => {
                str += chunk;
            });
            response.on('end', () => {
                try {
                    let parsed_feed = [];
                    var $ = cheerio.load(str);
                    var data = $('div.upnews');
                    $(data).each((i, link) => {
                        let field = {
                            title: $(link).find("span.title").text(),
                            text: $(link).find("span.con").text(),
                            link: $(link).find("a.more").attr("href")
                        }
                        parsed_feed.push(field);
                    })
                    resolve(parsed_feed);
                } catch (error) {
                    reject("Nem sikerült a hírfolyamot összeállítani.");
                }
            });
        });
        req.on('error', error => {
            reject("Nem sikerült a hírfolyam lekérdezése.")
        })
        req.end();
    })
}

module.exports = getFeed();