/* 

JS - HOLYTRIVIA BY HOLYVERSES.XYZ 
Do you know your bible ? Let's find out with this trivia.

*/

// VARIABLES

var htBotNote = document.getElementById("htBotNote");

var htGameLoaded = document.getElementById("htGameLoaded");

var htQuizzVerse = document.getElementById("htQuizzVerse");

var htQuizzAnswerOne = document.getElementById("htQuizzAnswerOne");

var htQuizzAnswerTwo = document.getElementById("htQuizzAnswerTwo");

var htQuizzAnswerThree = document.getElementById("htQuizzAnswerThree");

var htQuizzAnswerFour = document.getElementById("htQuizzAnswerFour");

// DATA

var request_type = new XMLHttpRequest();

var randata = ["0_1_2_3","1_0_2_3","2_0_1_3","3_1_2_0","0_1_3_2","1_0_3_2","2_0_3_1","3_1_0_2","0_2_1_3","1_2_0_3","2_1_3_0","3_2_0_1","0_2_3_1","1_2_3_0","2_1_0_3","3_2_1_0","0_3_2_1","1_3_2_0","2_3_0_1","3_0_1_2","0_3_1_2","1_3_0_2","2_3_1_0","3_0_2_1"];

var bibleChapter = ["genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua", "judges", "ruth", "samuel", "kings", "chronicles", "ezra", "nehemiah", "esther", "job", "psalms", "proverbs", "ecclesiastes", "song of Solomon", "isaiah", "jeremiah", "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah", "jonah", "micah", "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi", "matthew", "mark", "luke", "john", "acts", "romans", "corinthians", "galatians", "ephesians", "philippians", "colossians", "thessalonians", "timothy", "titus", "philemon", "hebrews", "james", "peter", "john", "jude", "revelation"];

var nkjTxt = "nkj.txt";

var z = 0;

var nkjvBible = ""; // holy bible stored

var nkjvTrivia = []; // holy bible verses selected

var quizzTrivia = []; // 10 verses for trivia quizz

var quizzAnswer = []; // holy bible chapter to choose from

var quizzNote = 0; // user trivia quizz result

var quizzStart = ""; // start time to answer quizz

var quizzEnd = ""; // end time to answered quizz

// FUNCTION 

function htLoaded(){
    
    htBotNote.innerHTML = "Wait a second! We are loading holytrivia quizz...";
    
    htGameLoaded.style.display = "none";
    
    // Load the new king james version holy bible and build the game from there
    var rawFile = request_type; //new XMLHttpRequest();
    
    rawFile.open("GET", nkjTxt);
    
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200)
            {
                // get nkj.txt in hvTxt string
                hvTxt = rawFile.responseText;
                
                // turn hvTxt string into nkjvBible array database
                nkjvBible = hvTxt.split("/");
                
                // strip nkjvBible to get nkjvTrivia
                for (var a = 0; a < nkjvBible.length; a++) {
                    // get the verse checked
                    var getFullVerse = nkjvBible[a];
                    
                    var getParts = getFullVerse.split("_");
                    
                    var getPartOne = getParts[1];
                    
                    var getVerseTrim = getPartOne.replace(/\s/g,'');
                    
                    // check if the verses is >= 250 characters 
                    if(getVerseTrim.length >= 140) {
                        // push verses inside nkjvTrivia
                        nkjvTrivia.push(nkjvBible[a]);
                    }
                    
                }
                
                var b = 10;
                
                // create 10 questions fo quizzTrivia
                while (b--) {
                    // get random number from oldTrivia
                    var r = Math.floor(Math.random() * nkjvTrivia.length);
                    
                    // push r in quizzTrivia
                    quizzTrivia.push(r);
                }
                
                // create first question
                var c = quizzTrivia[z];
                
                var quizzVerse = nkjvTrivia[c];
                
                htBotNote.innerHTML = quizzVerse;
                    
                var quizzParts = quizzVerse.split("_");
                
                htQuizzVerse.innerHTML = quizzParts[1];
                
                var getQuizzPartZero = quizzParts[0];
                
                var chapterFC = getQuizzPartZero.replace(/[0-9]/g, '');
                
                var chapterSC = chapterFC.replace(':','');
                
                quizzAnswer.push(chapterSC);
                
                var oldChapter = bibleChapter;
                
                // create oldChapter without chapterSC
                var u = oldChapter.length;
                while (u--) {
                    if(chapterSC.toUpperCase() === oldChapter[u].toUpperCase()){
                        //remove chapterSC from oldChapter
                        oldChapter.splice(u,1);
                    }     
                }
                
                // random quizzAnswer 2 to 4
                var e = 3;
                
                while (e--) {
                    f = Math.floor(Math.random() * oldChapter.length);
                    quizzAnswer.push(oldChapter[f]);
                    oldChapter.splice(f,1);
                    
                }
                
                var g = Math.floor(Math.random() * randata.length);
                
                var answerList = randata[g];
                
                var answerQ = answerList.split("_");
                
                var h = answerQ[0];
                
                var i = answerQ[1];
                
                var j = answerQ[2];
                
                var k = answerQ[3];
                
                // answers to choose
                
                htQuizzAnswerOne.innerHTML = quizzAnswer[h];
                
                htQuizzAnswerTwo.innerHTML = quizzAnswer[i];
                
                htQuizzAnswerThree.innerHTML = quizzAnswer[j];
                
                htQuizzAnswerFour.innerHTML = quizzAnswer[k];
                
                // get time start
                
                var l = new Date();
                
                quizzStart = l.getTime();
                
                // show the game
                
                htBotNote.innerHTML = "Choose the right answer of this holy bible verse.";
                
                htGameLoaded.style.display = "block";
                
            }
        }
    };
    
    rawFile.send(null);
}



function htAnswered() {
    // checking statement
    htBotNote.innerHTML = "Wait a second! We are checking your answer...";
    htGameLoaded.style.display = "none";
    
    // get time start
    var a = new Date();
    quizzEnd = a.getTime();
    
    var lapse = quizzEnd - quizzStart;
    
    var quizzTime = lapse / 60000;
    
    // get id of button pressed
    var getId = this.id;
    
    // get answer to the htQuizzAnswerOne
    var userAnswer = document.getElementById(""+getId).innerHTML;
    
    var b = quizzTrivia[z];
    
    var theVerse = nkjvTrivia[b];
    
    var quizzResult = "";
    
    // get chapter verse for check
    var verseParts = theVerse.split("_");
    
    var chapterQuizz = verseParts[0];
    
    chapterQuizz = chapterQuizz.replace(/[0-9]/g, '');
    
    chapterQuizz = chapterQuizz.replace(':','');
    
    // get to the next answer
    z = z + 1;
    
    var c = 10 - z;
    
    if(chapterQuizz == userAnswer) {
        // right answer (+2)
        if(quizzTime <= 2){
            // get +2 point
            quizzNote = parseInt(quizzNote) + 2;
            
            quizzResult = "Good answer and quick response! <b>"+c+"</b> question(s) left";
        } else {
            // get 0 point
            quizzNote = parseInt(quizzNote) + 1;
            
            quizzResult = "Good answer but slow response! <b>"+c+"</b> question(s) left";
        }
        
    } else {
        // wrong answer (0)
        quizzResult = "Wrong answer! <b>"+c+"</b> question(s) left";
    }
    
    // check trivia done
    if(z == 10){
        // give the appropriate feedback
        if(quizzNote >= 0 && quizzNote <= 5){
            // feedback 0 to 5
            quizzResult = "<label>(hosea 4:6) My people are destroyed for lack of knowledge.Because you have rejected knowledge,I also will reject you from being priest for Me;Because you have forgotten the law of your God,I also will forget your children.</label> <b>"+quizzNote+"/20</b> It's critical for you to read your holy bible. It's for your spiritual safety!";
            
        } else if(quizzNote >= 6 && quizzNote <= 10){
            // feedback 0 to 5
            quizzResult = "<label>(romans 12:2) And do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.</label> <b>"+quizzNote+"/20</b> Do yourself a favor: read your holy bible. It will empower your life!";
            
        } else if(quizzNote >= 11 && quizzNote <= 15){
            // feedback 0 to 5
            quizzResult = "<label>(psalm 119:105) Your word is a lamp to my feet And a light to my path.</label> <b>"+quizzNote+"/20</b> You are doing good! Keep the good work by reading your holy bible.";
            
        } else if(quizzNote >= 16 && quizzNote <= 20) {
            // feedback 0 to 5
            quizzResult = "<label>(hebrews 4:12) For the word of God is living and powerful, and sharper than any two-edged sword, piercing even to the division of soul and spirit, and of joints and marrow, and is a discerner of the thoughts and intents of the heart.</label> <b>"+quizzNote+"/20</b> You are amazing: stay fearless and faithfull in Jesus Christ. If you have time, we invite you to share your knowledge about the holy bible verses on <a href='https://holyverses.xyz' target='_blank'>holyverses.xyz</a>";
        } else {
            // nothing
        }
        
        // result
        htBotNote.innerHTML = quizzResult;
        
        
    } else {
        // empty quizzAnswer
        if(quizzAnswer.length > 0){
            quizzAnswer = [];
            
        }
        
        // run the game again - create question
        var d = quizzTrivia[z];
                
        var quizzVerse = nkjvTrivia[d];
                
        var quizzParts = quizzVerse.split("_");
                
        htQuizzVerse.innerHTML = quizzParts[1];
                
        var getQuizzPartZero = quizzParts[0];
                
        var chapterFC = getQuizzPartZero.replace(/[0-9]/g, '');
                
        var chapterSC = chapterFC.replace(':','');
        
        // create quizzAnswer 1     
        quizzAnswer.push(chapterSC);
                
        var oldChapter = bibleChapter;
                
        // create oldChapter without chapterSC
        var u = oldChapter.length;
        while (u--) {
            if(chapterSC.toUpperCase() === oldChapter[u].toUpperCase()){
                //remove chapterSC from oldChapter
                oldChapter.splice(u,1);
            }     
        }
        
        // random quizzAnswer 2 to 4
        var f = 3;
                
        while (f--) {
            g = Math.floor(Math.random() * oldChapter.length);
            quizzAnswer.push(oldChapter[g]);
            oldChapter.splice(g,1);
        }
        
        // randata stuff       
        var h = Math.floor(Math.random() * randata.length);
                
        var answerList = randata[h];
                
        var answerQ = answerList.split("_");
                
        var i = answerQ[0];
                
        var j = answerQ[1];
                
        var k = answerQ[2];
                
        var l = answerQ[3];
                
        // answers to choose
                
        htQuizzAnswerOne.innerHTML = quizzAnswer[i];
                
        htQuizzAnswerTwo.innerHTML = quizzAnswer[j];
                
        htQuizzAnswerThree.innerHTML = quizzAnswer[k];
                
        htQuizzAnswerFour.innerHTML = quizzAnswer[l];
                
        // get time start
                
        var m = new Date();
                
        quizzStart = m.getTime();
                
        // show the game
                
        htBotNote.innerHTML = quizzResult;
                
        htGameLoaded.style.display = "block";
    }
    
}

// ADDEVENTLISTENER

htQuizzAnswerOne.addEventListener("click",htAnswered, false);

htQuizzAnswerTwo.addEventListener("click",htAnswered, false);

htQuizzAnswerThree.addEventListener("click",htAnswered, false);

htQuizzAnswerFour.addEventListener("click",htAnswered, false);


