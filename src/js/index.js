letter_list = [
    ["A","Letter", [0,1]],
    ["B","Letter", [1,0,0,0]],
    ["C","Letter", [1,0,1,0]],
    ["D","Letter", [1,0,0]],
    ["E","Letter", [0]],
    ["F","Letter", [0,0,1,0]],
    ["G","Letter", [1,1,0]],
    ["H","Letter", [0,0,0,0]],
    ["I","Letter", [0,0]],
    ["J","Letter", [0,1,1,1]],
    ["K","Letter", [1,0,1]],
    ["L","Letter", [0,1,0,0]],
    ["M","Letter", [1,1]],
    ["N","Letter", [1,0]],
    ["O","Letter", [1,1,1]],
    ["P","Letter", [0,1,1,0]],
    ["Q","Letter", [1,1,0,1]],
    ["R","Letter", [0,1,0]],
    ["S","Letter", [0,0,0]],
    ["T","Letter", [1]],
    ["U","Letter", [0,0,1]],
    ["V","Letter", [0,0,0,1]],
    ["W","Letter", [0,1,1]],
    ["X","Letter", [1,0,0,1]],
    ["Y","Letter", [1,0,1,1]],
    ["Z","Letter", [1,1,0,0]],
    ["1","Number", [0,1,1,1,1]],
    ["2","Number", [0,0,1,1,1]],
    ["3","Number", [0,0,0,1,1]],
    ["4","Number", [0,0,0,0,1]],
    ["5","Number", [0,0,0,0,0]],
    ["6","Number", [1,0,0,0,0]],
    ["7","Number", [1,1,0,0,0]],
    ["8","Number", [1,1,1,0,0]],
    ["9","Number", [1,1,1,1,0]],
    ["0","Number", [1,1,1,1,1]],    
]

let global_question_index = 0;
let global_total_question = 150;

let global_question_info;

$("#next").click(function(){
    next_question();
});

function initMemoryPage(){
    console.log('Memory Page');
    // next_question();
    
}

function next_question(){
    resetBtns();
    // 将question_index加一，然后显示到#qindex中
    global_question_index += 1;
    if(global_question_index > global_total_question){
        global_question_index = global_total_question;
    }
    $("#qindex").text(global_question_index);

    var q = generate_a_question();
    global_question_info = q;
    var question = q[0];
    var options = q[1];
    var answer = q[2];
    var media = q[3];
    console.log(question);
    console.log(options);
    console.log(answer);
    console.log(media);
    $("#question").text(question);
    $("#option1").text(options[0]);
    $("#option2").text(options[1]);
    $("#option3").text(options[2]);
    $("#option4").text(options[3]);
    // 播放音频
    var audio = new Audio(media);
    audio.play();
}

function generate_a_question(){
    // 在0~35中随机选取一个数字
    var random_number_key = Math.floor(Math.random() * 36);
    // Question是一个字符串，0是·，1是-，用于显示
    // Options是一个数组，有四个值，都是字符串，比如“Letter A”或者“Number 1”
    // Answer是一个整数，为0~3之间的数字，表示选项中的哪一项是正确答案

    // 首先找到一个标准答案，然后再找三个混淆项，处理question字符串和options，最后shuffle数组然后返回
    var answer = letter_list[random_number_key];

    // 生成一个由4个0~35数字组成的数组，去重
    var random_list = [];
    while(random_list.length < 4){
        var random_number = Math.floor(Math.random() * 36);
        if(random_list.indexOf(random_number) == -1 && random_list.indexOf(random_number_key) == -1){
            random_list.push(random_number);
        }
    }
    // 生成一个0~3的数字
    var answer_index = Math.floor(Math.random() * 4);
    random_list[answer_index] = random_number_key;

    console.log(random_list);

    // 遍历random_list，生成options
    var options = [];
    for(var i=0; i<4; i++){
        var letter = letter_list[random_list[i]];
        options.push(letter[1] + " " + letter[0]);
    }

    // 生成question
    var question = "";
    for(var i=0; i<letter_list[random_number_key][2].length; i++){
        if(letter_list[random_number_key][2][i] == 0){
            question += "·";
        }else{
            question += "-";
        }
    }

    // 生成medialist
    var media = "/assets/media/"+letter_list[random_number_key][0].toLowerCase()+".mp3";

    return [question, options, answer_index, media];
}

function validate_answer(option){
    console.log("OPT",option);
    // console.log(global_question_info);
    var answer = global_question_info[2];
    var options = global_question_info[1];
    // 如果Answer和option相等，那么就是正确答案，直接下一题
    // option 是0~3的数字
    if(answer == option){
        console.log("Correct!");
        setTimeout(() => {
            next_question();
    
        }, 200);
    } else {
        // 将#answer-btn-{option}的选项标红，另外两个选项设置为disabled，正确答案不变
        $("#answer-btn-"+option).css("background-color", "red");
        for(var i=1; i<5; i++){
            if(i != option){
                $("#answer-btn-"+i).attr("disabled", "true");
            }
        }

    }
}

function resetBtns() {
    for(var i=1; i<5; i++){
        $("#answer-btn-"+i).css("background-color", "var(--color-primary)");
        $("#answer-btn-"+i).removeAttr("disabled");
    }

}

// 侦测answer-btn-0~3的点击事件
$("#answer-btn-1").click(function(){
    console.log("Clicked 0");
    validate_answer(0);
});
$("#answer-btn-2").click(function(){
    console.log("Clicked 1");
    validate_answer(1);
});
$("#answer-btn-3").click(function(){
    console.log("Clicked 2");
    validate_answer(2);
});
$("#answer-btn-4").click(function(){
    console.log("Clicked 3");
    validate_answer(3);
});