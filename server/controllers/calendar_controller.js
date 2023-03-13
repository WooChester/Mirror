// const username = 'chesterciao409@gmail.com';
// const password = 'Ineedapassword1';
 
// const calendar = new ICloudCalendar();

// getEvents = async (req, res) => {
//     // calendar.login(username, password).then(resp => {
//     //     calendar.getEvents(LanguageLocales["en-US"], TimeZones["America/New_York"], '2023-03-12', '2023-01-18').then(calendars => {
//     //         console.log(calendars);
//     //     }).catch(err => {
//     //         console.error(err);
//     //         return res.status(200).json({});
//     //     });
//     // }).catch(err => {
//     //     console.error(err);
//     // });
// }


// module.exports = {
//     getEvents
// }

const { google } = require('googleapis');

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
//const GOOGLE_PRIVATE_KEY = process.env.APP_CALENDAR_API_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.APP_CALENDAR_API_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.APP_CALENDAR_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.APP_CALENDAR_CALENDAR_ID;

const fixedKey = process.env.APP_CALENDAR_API_KEY.replace(new RegExp("\\\\n", "\g"), "\n")

const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    fixedKey,
    SCOPES
);

const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});

getEvents = async (req, res) => {

    const today = new Date();
    const final_day = new Date();
    final_day.setDate(final_day.getDate());

    calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: today.toISOString(),
        timeMax: final_day.toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, 
    (error, result) => {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ error: error }));
            return res.status(400).json(error);
        } 
        else if (result.data.items.length) {
            console.log(result.data.items);
            return res.status(200).json(result.data.items);
        } 
        else {
            console.log("No events found");
            return res.status(204).json({});
        }
    });
}

module.exports = {
    getEvents
}