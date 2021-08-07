'use stict';
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
  while (element.firstChild){ //element-areaになにかタグがある限りループ
    element.removeChild(element.firstChild);
   }
   //removeAllChildren(resultDivided);を実行すると、elementにresultDividedが代入される。Dividedの前の部分(ここではresult)の子要素がresultDivided.removeChildによって削除される
}

//Enterを押した場合にも診断結果が表示されるようにする
userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    // TODO ボタンのonclick() 処理を呼び出す
    assessmentButton.onclick();
  }
};

//ボタンを押したときに実行される処理をまとめた関数
//function () のように引数がないものを無名関数と言い、二度と使わない、即実行する関数を無名関数にすることが多い。
assessmentButton.onclick = function () {
  //テキストボックスinput type="text"の値を.valueで取得する それを変数userNameに代入
  let userName = userNameInput.value;
  if(userName.length === 0){
    //名前の入力がなかったため、この関数の処理を終了 ガード句という
    return;
  }

  //すでにある診断結果を削除
  removeAllChildren(resultDivided);//診断結果エリアの表示
  

  //result-areaにh3タグで"診断結果"という文字を表示
  const h3 = document.createElement('h3'); //h3タグ作成
  h3.innerText = '診断結果' ; // h3タグに'診断結果'の文字列を作成
  resultDivided.appendChild(h3); // result-areaにh3変数を指定

  //診断処理実行
  const result = assessment(userName);

  // result-areaにpタグで診断結果を表示
  const p =document.createElement('p');
  p.innerText = result;
  resultDivided.appendChild(p);

  //tweetボタンの表示
  removeAllChildren(tweetDivided); //tweetエリアの初期化
  //aタグを作って属性を設定する
  const a = document.createElement('a');
  const href = 'https://twitter.com/intent/tweet?button_hashtag='
  + encodeURIComponent('あなたのいいところ')
  + '&ref_src=twsrc%5Etfw';

  a.setAttribute('href', href);
  a.setAttribute('class','twitter-hashtag-button');
  a.setAttribute('data-text', result);
  a.innerText = 'Tweet #あなたのいいところ';

  //aタグをhtmlとして追加
  tweetDivided.appendChild(a);

  //scriptタグを作る
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
}

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方ないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果 
 * 
 */

function assessment(userName){
  //userName(文字列)を数値（漢字だと5桁）に変換
  let userNameNumber = 0;
  for (let i = 0; i < userName.length; i++) {userNameNumber += userName.charCodeAt(i);
  }

  //5桁の数値を回答結果の範囲(0~15)に変換
  let answerNumber = userNameNumber % answers.length;
  let result = answers[answerNumber];
 
  return result.replace(/\{userName\}/g, userName);
  //正規表現で{userName\}をuserNameに置換→returnで診断結果表示

}

console.assert(
  assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);

console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));
