const questions = [
    {
        question: "Which of the following is a type of supervised learning?",
        answers: [
            { text: "K-Means Clustering",correct: false},
            { text: "Decision Trees",correct: true},
            { text: "Apriori Algorithm",correct: false},
            { text: "PCA (Principal Component Analysis)",correct: false},
        ]
    },
    {
        question: "Which of the following is used to avoid overfitting?",
        answers: [
            { text: "Using a deeper neural network",correct: false},
            { text: "Adding more features to the model",correct: false},
            { text: "Regularization techniques",correct: true},
            { text: " Reducing the amount of training data",correct: false},
        ]
    },
    {
        question: "Which algorithm is used for classification problems?",
        answers: [
            { text: "Linear Regression",correct: false},
            { text: "Logistic Regression",correct: true},
            { text: "K-Means",correct: false},
            { text: "DBSCAN",correct: false},
        ]
    },
    {
        question: "What does the 'k' represent in the k-Nearest Neighbors algorithm?",
        answers: [
            { text: "The number of nearest points",correct: true},
            { text: "The number of features",correct: false},
            { text: "The number of dimensions",correct: false},
            { text: "The number of classes",correct: false},
        ]
    },
    {
        question: "Which of the following is a loss function commonly used in regression tasks?",
        answers: [
            { text: "Cross-Entropy Loss",correct: false},
            { text: "Hinge Loss",correct: false},
            { text: "Mean Squared Error",correct: true},
            { text: "Log Loss",correct: false},
        ]
    },
    {
        question: "Which machine learning technique is used to reduce the dimensionality of data?",
        answers: [
            { text: "Classification",correct: false},
            { text: "Clustering",correct: false},
            { text: "Regression",correct: false},
            { text: "PCA (Principal Component Analysis)",correct: true},
        ]
    },
    {
        question: "What is the primary purpose of the validation set in machine learning?",
        answers: [
            { text: "To train the model",correct: false},
            { text: "To test the model",correct: false},
            { text: "To fine-tune the model's hyperparameters",correct: true},
            { text: "To reduce the size of the dataset",correct: false},
        ]
    },
    {
        question: "Which of the following is an ensemble learning method?",
        answers: [
            { text: "Decision Trees",correct: false},
            { text: "Random Forest",correct: true},
            { text: "SVM (Support Vector Machine)",correct: false},
            { text: "Naive Bayes",correct: false},
        ]
    },
    {
        question: "Which of the following metrics is used to evaluate the performance of a classification model?",
        answers: [
            { text: "R-squared",correct: false},
            { text: "Mean Absolute Error",correct: false},
            { text: "Confusion Matrix",correct: true},
            { text: "Mean Squared Error",correct: false},
        ]
    },
    {
        question: "What is the purpose of a kernel function in Support Vector Machines (SVM)?",
        answers: [
            { text: "To measure the distance between points",correct: false},
            { text: "To transform the data into a higher-dimensional space",correct: true},
            { text: "To normalize the data",correct: false},
            { text: "To reduce the complexity of the model",correct: false},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score  = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ===  "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

})
startQuiz();