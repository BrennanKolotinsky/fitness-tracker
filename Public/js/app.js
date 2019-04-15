// this function is called whenever the text is updated
function updateUserLink() {
    let x = document.getElementById('user').value; //this will grab the text inputted
    console.log(x);
    document.getElementById('user-submit').href = "http://localhost:3000/api/exercise/new-user/" + x; //update where we are submitting to!
};

function updateExerciseLink() {
    let id = document.getElementById('userId').value; //this will grab the text inputted
    let description = document.getElementById('description').value;
    let duration = document.getElementById('duration').value;
    let date = document.getElementById('date').value;

    // the  date isn't required so we'll change the link based on whether it has been entered
    if (id && description && duration && date) {
        document.getElementById('exercise-submit').href = "http://localhost:3000/api/exercise/add/exerciseInfo?" + "id=" + userId + "&description=" + description + "&duration=" + duration + "&date=" + date; //update where we are submitting to!
    } else if (id && description && duration) {
        document.getElementById('exercise-submit').href = "http://localhost:3000/api/exercise/add/exerciseInfo?" + "id=" + id + "&description=" + description + "&duration=" + duration;
    }
};


