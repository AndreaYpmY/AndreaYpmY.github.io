

$(document).ready(function() {
    $.ajax({
        url: "json/myProject.json",
        dataType: "json",
        success: function(data) {
            generateCards(data);
        }
    });
    $.ajax({
        url: "json/myPerson.json",
        dataType: "json",
        success: function(data) {
            generateInfo(data);
            generateCareer(data);
            generateSkills(data);
            generateInterests(data);
        }
    });

});


function generateCards(data) {
    var events = data.project;
    var container = document.querySelector('.container');
    for (var i = 0; i < events.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card');

        var a=document.createElement('a');
        a.setAttribute("href",events[i].link);

        var image = document.createElement('img');
        image.classList.add('card-img');
        image.src = events[i].image;
        image.alt = events[i].title;
        card.appendChild(image);


        var details= document.createElement('div');
        details.classList.add('details');

        var title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = events[i].title;
        details.appendChild(title);

        var description = document.createElement('p');
        description.classList.add('card-description');
        description.textContent = events[i].description;
        details.appendChild(description);

        a.appendChild(details);
        card.appendChild(a);

        container.appendChild(card);
    }
}

function generateInfo(data){
    var info = data.info;
    var year=data.year;
    var month=data.month;
    var day=data.day;

    var container = document.querySelector('.profile-description');

    var title = document.createElement('h3');
    title.classList.add('profile-title');
    title.textContent="I am Andrea Tocci";
    container.appendChild(title);

    var text = document.createElement('p');
    text.classList.add('profile-text');
    text.textContent="I am a "+calculateAge(year,month,day)+ " year old born in Cosenza\n"+info;
    container.appendChild(text);
}

function generateCareer(data){

    var container = document.querySelector('.career');
    var careerData = data.career;
    for (var i = 0; i < careerData.length; i++) {
        var card = document.createElement('div');
        card.classList.add('career-card');

        var years= document.createElement('p');
        years.classList.add('career-card-years');
        years.textContent="Date : "+careerData[i].start +" - "+careerData[i].end;
        card.appendChild(years);

        var qualification = document.createElement('h3');
        qualification.classList.add('career-card-qualification');
        qualification.textContent=careerData[i].qualification;
        card.appendChild(qualification);

        var place = document.createElement('p');
        place.classList.add('career-card-place');
        place.textContent=careerData[i].place;
        card.appendChild(place);

        container.appendChild(card);
    }
}
function generateSkills(data){
    var container = document.querySelector('.skills');
    var skillsDate = data.skills;
    for (var i = 0; i < skillsDate.length; i++) {

        var p= document.createElement('p');
        var span=document.createElement('span');
        span.textContent=skillsDate[i];

        p.appendChild(span);
        container.appendChild(p);
    }
}

function generateInterests(data){
    var container = document.querySelector('.interests');
    var interestsData = data.interests;
    for (var i = 0; i < interestsData.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card-interests');

        var span=document.createElement('span');
        span.classList.add('interests-tooltip');
        span.textContent=interestsData[i].type;
        card.appendChild(span)

        var image = document.createElement('img');
        image.src = interestsData[i].url;
        card.appendChild(image);



        container.appendChild(card);
    }
}

function calculateAge(year, month, day) {
    var birthDate = new Date(year, month - 1, day);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


