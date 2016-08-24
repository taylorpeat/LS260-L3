// 1

string.replace(/123/, "ABC");

// 2

function bigLetterChecker(string) {
  return !!string.match(/^[A-Z]/);
}

// 3

function spaceEraser(string) {
  string.replace(/^\s*|\s*$/g, "")
}

// 4

string.match(/\$/g).length

// 5

var passing_sentence = "The characters that specify repetition always follow the pattern to which they are being applied.";
var failing_sentence = "I am the 1337est";

function longWordSensor(sentence) {
  return /[a-z]{5,7}/i.test(sentence);
}

// 6

var query = "Hen";
var source = "She'll be coming 'round the mountain when she comes";

query = new RegExp(query, 'i');
query.test(source);

// 7

var string = "H%*e(ll)o";

string.match(/\w/g).join("");

// 8

var regexp = /(['"]\w+\1)/

// 9

var regexp = /\(\d{3}\)\s\d{3}-\d{4}$/

// 10

var regexp = /^([01]-)?\(\d{3}\)\s\d{3}-\d{4}(x\d+)*$/