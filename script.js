document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search');
    const userInput = document.getElementById('username');
    const statsContainer = document.querySelector('.stats-container');
    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector('.hard-progress');
    const easyLabel = document.getElementById('easy-label');
    const mediumLabel = document.getElementById('medium-label');
    const hardLabel = document.getElementById('hard-label');
    const cardStatsContainer = document.querySelector('.stats-container');

    function validateUsername(username) {
        if (username.trim() === '') {
            alert('Username cannot be empty');
            return false;
        }
        const regex = /^[a-zA-Z0-9_]{3,16}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert('Username must be 3-16 characters long and can only contain letters, numbers, and underscores.');
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = 'Searching...';
            searchButton.disabled = true;
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const url = `https://leetcode.com/graphql/`;
            const myheaders = new Headers();
            myheaders.append("Content-Type", "application/json");
            const graphql = JSON.stringify({
                query: `
                    query userSessionProgress($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                                totalSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                        }
                    }
                `,
                variables: {
                    "username": `${username}`
                }
            });
            const requestOptions = {
                method: 'POST',
                headers: myheaders,
                body: graphql,
                redirect: 'follow'
            };
            const response = await fetch(proxyUrl + url, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const parseddata = await response.json();
            console.log("logging data:", parseddata);
            displayUserData(parseddata); // <-- Call displayUserData after fetching
        } catch (error) {
            statsContainer.innerHTML = `<p>Error fetching user details: ${error.message}</p>`;
        } finally {
            searchButton.textContent = 'Search';
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty('--progress-degree', `${progressDegree}%`);
        label.textContent = `${solved} / ${total}`;
    }

    function displayUserData(parseddata) {
        const totalQues = parseddata.data.allQuestionsCount[0].count;
        const totalEasyQues = parseddata.data.allQuestionsCount[1].count;
        const totalMediumQues = parseddata.data.allQuestionsCount[2].count;
        const totalHardQues = parseddata.data.allQuestionsCount[3].count;

        const solvedTotalEasyQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMediumQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHardQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHardQues, totalHardQues, hardLabel, hardProgressCircle);
    }

    searchButton.addEventListener('click', function() {
        const username = userInput.value;
        console.log("logging username:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
