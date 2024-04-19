function setCookie(cname, cValue, expdays) {
    const d = new Date();
    d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cValue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    const name = cname + "=";
    const cDecode = decodeURIComponent(document.cookie);
    const cArr = cDecode.split("; ");
    let value;
    cArr.forEach(val => {
        if(val.indexOf(name) === 0) value = val.substring(name.length);
    })
    return value;
  }
  

document.querySelector("#cookies-btn").addEventListener("click", () => {
  document.querySelector("#cookies").style.display = "none";
  setCookie("cookie", true, 30);
})

cookeMessage = () => {
    if(!getCookie("cookie"))
    document.querySelector("#cookies").style.display = "block";

}

window.addEventListener("load", cookeMessage);



