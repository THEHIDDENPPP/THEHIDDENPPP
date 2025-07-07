//! NEW ONE
import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

// File path for tracking data
const path = "./data.json";

// 🔹 Define the date range for commits
const START_DATE = "2024-01-01";  // Change this to your desired start date
const END_DATE = "2024-01-09";    // Change this to your desired end date

// 🔹 Control intensity (commits per day)
const MIN_COMMITS_PER_DAY = 0;
const MAX_COMMITS_PER_DAY = 4;

const git = simpleGit();

async function sprayCommits() {
    let currentDate = moment(START_DATE);
    const endDate = moment(END_DATE);

    while (currentDate.isSameOrBefore(endDate)) {
        // 🔹 Generate random number of commits for this day
        let commitsToday = Math.floor(Math.random() * (MAX_COMMITS_PER_DAY - MIN_COMMITS_PER_DAY + 1)) + MIN_COMMITS_PER_DAY;

        for (let i = 0; i < commitsToday; i++) {
            // 🔹 Randomize the time of commit within the day
            let randomHour = Math.floor(Math.random() * 24);
            let randomMinute = Math.floor(Math.random() * 60);
            let randomSecond = Math.floor(Math.random() * 60);

            // 🔹 Create commit timestamp
            let commitTime = currentDate.hour(randomHour).minute(randomMinute).second(randomSecond).format();

            // 🔹 Update data.json with commit time
            const data = { date: commitTime };
            await jsonfile.writeFile(path, data);

            // 🔹 Make the commit with the specified date
            await git.add([path]).commit(commitTime, { '--date': commitTime });

            console.log(`Commit made on ${commitTime}`);
        }

        // Move to the next day
        currentDate.add(1, 'day');
    }

    // 🔹 Push all commits at once (optional, can be inside loop if needed)
    await git.push();
    console.log("✅ All commits pushed successfully!");
}

// Run the function
sprayCommits();