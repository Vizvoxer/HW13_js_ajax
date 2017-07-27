/**
 * Created by Роман on 26.07.2017.
 */

var body = document.querySelector("body");
var data = [];
var submit = document.querySelector("input[type=submit]");
var newAuthor = document.querySelector("input[name=author]");
var newTitle = document.querySelector("input[name=title]");
var authorValue;
var titleValue;
var newPost;

function getJSON(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onreadystatechange = function() {
        var status;

        if (xhr.readyState === 4) {
            status = xhr.status;

            if (status === 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };

    xhr.send();
}

getJSON(
    "http://localhost:3000/posts",
    function(data) {
        createPosts();
    },
    function(status) {
        console.log("Something went wrong.", status);
    }
);

function createPosts() {
    data.forEach(function(el) {
        var post = document.createElement("div");
        post.innerHTML = el.author + " - " + el.title;
        body.appendChild(post);
    });
}

function addPost() {
    var post = document.createElement("div");
    post.innerHTML =
        data[data.length - 1].author + " - " + data[data.length - 1].title;
    body.appendChild(post);
}

function postJSON(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    authorValue = newAuthor.value;
    titleValue = newTitle.value;
    newPost = {
        author: authorValue,
        title: titleValue
    };
    var toSend = JSON.stringify(newPost);

    xhr.open("post", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() {
        var status;

        if (xhr.readyState === 4) {
            status = xhr.status;

            if (status === 201) {
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };

    xhr.send(toSend);
}

submit.addEventListener("click", function(e) {
    e.preventDefault();

    postJSON(
        "http://localhost:3000/posts",
        function(data) {},
        function(status) {
            console.log("Something went wrong.", status);
        }
    );

    setTimeout(function() {
        getJSON(
            "http://localhost:3000/posts",
            function(data) {
                addPost();
                newAuthor.value = "";
                newTitle.value = "";
            },
            function(status) {
                console.log("Something went wrong.", status);
            }
        );
    }, 10);
});
