

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Downloader = require('nodejs-file-downloader');

const fs = require('fs')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: "./downloads/list.csv",
    header: [
        { id: 'titl', title: 'CLIP TITLE' },
        { id: 'vid', title: 'VIDEOCLIP' },
        { id: 'alias', title: 'STREAMER ALIAS' },
        { id: 'name', title: 'STREAMERS TWITCH' }
    ]
})

const colors = require('colors');


const fetch = require('node-fetch');
const { count } = require('console');


const ACCESSTOKEN = ''
const client_id = ''
const client_secret = ''

const clipslist = [
    {
        "amount": 1,
        "name": "Smajor1995",
        "alias": "SMajor"
    },
    {
        "amount": 4,
        "name": "Philza",
        "alias": "Philza"
    },
    {
        'amount': 5,
        "name": "tommyinnit",
        "alias": "Tommy"
    },
    {
        "amount": 3,
        "name": "RanbooLive",
        "alias": "Ranboo"
    },
    {
        "amount": 2,
        "name": "Fundy",
        "alias": "Fundy"
    },
    {
        "amount": 1,
        "name": "TubboLive",
        "alias": "Tubbo"
    }
]

// To add a new streamer add one of these to the top of the starting []
//{
//"amount": 1,
//"name": "Fundy",
//"alias": "Fundy"
//}

// REMEMBER TO REMOVE THE "//" THEN change the amount to the amount of clips you want from the specified streamer
// and then change the alias to what they're reffered to as a streamer
// then you can add their TWITCH username, this needs to be exact otherwise it will not get the clips from the correct channel..

const recommendedamount = 40

const limit = 200

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

var once = 'no'


var check = 'no'
var count1 = 0
clipslist.forEach(streamer => {
    if (streamer.amount <= recommendedamount) {
        count1 = count1 + streamer.amount
    } else {
        if (streamer.amount >= recommendedamount) {
            check = 'no'
            if (once == 'yes') {
                //nope
            } else {
                once = 'yes'
            }
        } else {
            if (streamer.amount == recommendedamount) {
                check = 'no'
                if (once == 'yes') {
                    //nope
                } else {
                    once = 'yes'
                }
            }
            check = 'yes'
            if (once == 'yes') {
                //nope
            } else {
                once = 'yes'
            }
        }
    }
    if (count1 == recommendedamount) {
        if (check == 'no') {
            if (once == 'yes') {
                check = 'yes'
            } else {
                once = 'yes'
            }

            // failed
        } else {
            check = 'yes'
            if (once == 'yes') {
                //nope
            } else {
                once = 'yes'
            }
        }
    } else {
        if (count1 + streamer.amount <= recommendedamount) {
            if (check == 'no') {
                if (count1 + streamer.amount <= recommendedamount) {
                    check = 'yes'
                    if (once == 'yes') {
                        //nope
                    } else {
                        once = 'yes'
                    }
                } else {
                    if (streamer.amount <= recommendedamount) {
                        check = 'yes'
                        if (once == 'yes') {
                            //nope
                        } else {
                            once = 'yes'
                        }
                    } else {
                        check = 'no'
                        if (once == 'yes') {
                            //nope
                        } else {
                            console.log('failed(1)')
                            once = 'yes'
                        }
                    }
                }
            } else {
                check = 'yes'
                if (once == 'yes') {
                    //nope
                } else {
                    once = 'yes'
                }
            }

        } else {
            if (count1 >= recommendedamount) {
                if (check == 'no') {
                    once = 'yes'
                    // failed
                } else {
                    check = 'no'
                    if (once = 'yes') {
                        //nope
                    } else {
                        once = 'yes'
                    }
                }
            }
        }
    }
})

var requestedamount = 0

for (p = 0; p < clipslist.length; p++) {
    requestedamount = requestedamount + clipslist[p].amount
}

async function makecsv(clipsresponse, clipslist) {

    console.log('hi')

    for (i = 0; i < clipsresponse.length; i++) {

        const records = [
            { titl: clipsresponse[i].title, vid: 'AT-cm_' + clipsresponse[i].tracking_id + '.mp4', alias: clipslist[i].alias, name: 'https://www.twitch.tv/' + clipslist[i].name + '/' },
        ];

        csvWriter.writeRecords(records)
            .then(() => {
                console.log('...Done');
            });

    }
}

if (check == 'no') {
    console.error('Amount of requested clips is more than recommended. The recommended amount of clips is 30. \n Please see Index.js:50 to change the recommended amount.. '.red)
}

if (check == 'yes') {
    console.log('Clips have been checked, all should go well!'.cyan)
}

var answer1 = 'no'

if (check == 'yes') {
    readline.question('Are you sure you want to ' + 'DOWNLOAD'.yellow + ' these clips? (y/n)', answer => {
        if (answer == 'yes' || answer == 'Yes' || answer == 'y') {
            console.log(`Alright, Will start to download in 3 seconds..`.cyan);
            answer1 = 'yes'
            wait(3000)
            GetandDownloadClips()
        } else {
            answer1 = 'no'
        }
    })
}

var retrycount2 = 1
var retrycount3 = 1


var url = 'ye'

async function GetandDownloadClips() {


    if (check == 'no') {
        console.error('Amount of requested clips is more than recommended. The recommended amount of clips is 30. \n Please see Index.js:50 to change the recommended amount.. ')
    }

    if (check == 'yes') {

        if (answer1 == 'yes') {

            for (i = 0; i < clipslist.length; i++) {

                const getclipsss = await fetch(
                    'https://api.twitch.tv/kraken/clips/top?channel=' + clipslist[i].name + '&period=day&trending=true&limit=' + clipslist[i].amount,
                    {
                        "headers": {
                            "Client-ID": client_id,
                            "Accept": "application/vnd.twitchtv.v5+json"
                        }
                    }
                )

                var count3 = 0

                var count6 = 0

                const clipsresponse = await getclipsss.json()


                for (d = 0; d < clipsresponse.clips.length; d++) {

                    const downloader = new Downloader({
                        url: 'https://production.assets.clips.twitchcdn.net/AT-cm%7C' + clipsresponse.clips[d].tracking_id + '.mp4',//If the file name already exists, a new file with the name 200MB1.zip is created.     
                        directory: "./downloads",//This folder will be created, if it doesn't exist.               
                    })



                    try {
                        await downloader.download();//Downloader.download() returns a promise.

                        console.log('All done');

                        const records = [
                            { titl: clipsresponse.clips[d].title, vid: 'AT-cm_' + clipsresponse.clips[d].tracking_id + '.mp4', alias: clipslist[i].alias, name: 'https://www.twitch.tv/' + clipslist[i].name + '/' },
                        ];

                        csvWriter.writeRecords(records)
                            .then(() => {
                                //writes csv list
                            });
                    } catch (error) {

                        const getclipsss22 = await fetch(
                            'https://api.twitch.tv/kraken/clips/top?channel=' + clipslist[i].name + '&period=day&trending=true&limit=' + '20',
                            {
                                "headers": {
                                    "Client-ID": client_id,
                                    "Accept": "application/vnd.twitchtv.v5+json"
                                }
                            }
                        )

                        const random = Math.floor(Math.random() * (20 - 2 + 1) + 2);

                        const clipssresponse = await getclipsss22.json()

                        const downloader = new Downloader({
                            url: 'https://production.assets.clips.twitchcdn.net/AT-cm%7C' + clipssresponse.clips[random].tracking_id + '.mp4',//If the file name already exists, a new file with the name 200MB1.zip is created.     
                            directory: "./downloads",//This folder will be created, if it doesn't exist.               
                        })


                        try {
                            await downloader.download();//Downloader.download() returns a promise.


                            const records = [
                                { titl: clipssresponse.clips[random].title, vid: 'AT-cm_' + clipssresponse.clips[random].tracking_id + '.mp4', alias: clipslist[i].alias, name: 'https://www.twitch.tv/' + clipslist[i].name + '/' },
                            ];

                            csvWriter.writeRecords(records)
                                .then(() => {
                                    //writes csv list
                                });
                        } catch (error) {

                            var randommm = Math.floor(Math.random() * (20 - 2 + 1) + 2);

                            const downloader = new Downloader({
                                url: 'https://production.assets.clips.twitchcdn.net/AT-cm%7C' + clipssresponse.clips[randommm].tracking_id + '.mp4',//If the file name already exists, a new file with the name 200MB1.zip is created.     
                                directory: "./downloads",//This folder will be created, if it doesn't exist.               
                            })

                            try {
                                await downloader.download();//Downloader.download() returns a promise.


                                const records = [
                                    { titl: clipssresponse.clips[randommm].title, vid: 'AT-cm_' + clipssresponse.clips[randommm].tracking_id + '.mp4', alias: clipslist[i].alias, name: 'https://www.twitch.tv/' + clipslist[i].name + '/' },
                                ];

                                csvWriter.writeRecords(records)
                                    .then(() => {
                                        //writes csv list
                                    });
                            } catch (error) {

                                var randommm2 = Math.floor(Math.random() * (20 - 2 + 1) + 2);

                                const downloader = new Downloader({
                                    url: 'https://production.assets.clips.twitchcdn.net/AT-cm%7C' + clipssresponse.clips[randommm2].tracking_id + '.mp4',//If the file name already exists, a new file with the name 200MB1.zip is created.     
                                    directory: "./downloads",//This folder will be created, if it doesn't exist.               
                                })

                                try {
                                    await downloader.download();//Downloader.download() returns a promise.


                                    const records = [
                                        { titl: clipssresponse.clips[randommm2].title, vid: 'AT-cm_' + clipssresponse.clips[randommm2].tracking_id + '.mp4', alias: clipslist[i].alias, name: 'https://www.twitch.tv/' + clipslist[i].name + '/' },
                                    ];

                                    csvWriter.writeRecords(records)
                                        .then(() => {
                                            //writes csv list
                                        });
                                } catch (error) {


                                    const getclipsss222 = await fetch(
                                        'https://api.twitch.tv/kraken/clips/top?channel=' + clipslist[i].name + '&period=day&trending=true&limit=' + clipslist[i].amount + 1,
                                        {
                                            "headers": {
                                                "Client-ID": client_id,
                                                "Accept": "application/vnd.twitchtv.v5+json"
                                            }
                                        }
                                    )

                                    const responnnnssse = await getclipsss222.json()

                                    const downloader = new Downloader({
                                        url: 'https://production.assets.clips.twitchcdn.net/AT-cm%7C' + responnnnssse.clips[clipslist[i].amount + 1].tracking_id + '.mp4',//If the file name already exists, a new file with the name 200MB1.zip is created.     
                                        directory: "./downloads",//This folder will be created, if it doesn't exist.               
                                    })


                                    try {
                                        await downloader.download();//Downloader.download() returns a promise.


                                        const records = [
                                            { titl: responnnnssse.clips[cliplist[i].amount + 1].title, vid: 'AT-cm_' + responnnnssse.clips[clipslist[i].amount + 1].tracking_id + '.mp4', alias: clipslist[i].alias, name: 'https://www.twitch.tv/' + clipslist[i].name + '/' },
                                        ];

                                        csvWriter.writeRecords(records)
                                            .then(() => {
                                                //writes csv list
                                            });
                                    } catch (error) {
                                        console.error('Tried Several times to download one clip \n ONE CLIP IS MISSING!' .red)
                                    }
                                    


                                    }
                            }
                        }
                    }

                    //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
                    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.

                }

            }
        }
    }
}






console.log(`All clips have been downloaded.. Some clips may have not..  Find the list and mp4's /downloads..`.green)





/// HOW TO GET ACCESS TOKEN V V V V V V

//fetch('https://id.twitch.tv/oauth2/token?client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=client_credentials&scope=openid', {
//method: 'post'
//}).then(response => response.json()).then(data => console.log(data))

// REMOVE "//" ^^^
