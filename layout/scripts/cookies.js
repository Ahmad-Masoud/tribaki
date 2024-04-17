function setCookie(cname, cValue, expdays) {
    const d = new Date();
    d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cValue + ";" + expires + ";path=/, path=/pages/contactform ,path=/pages/galleryspace , path=/pages/gallerytech , path=/space/betelgeuse , path=/space/Euro-jupiter , path=/space/jwst , path=/space/jwstwse , path=/space/kdtmn , path=/space/NASAPsyche , path=/space/OSIRIS , path=/space/SME , path=/space/SpaceXandBoeing , path=/tech/CCBMA_12, path=/tech/CDDGIS, path=/tech/chinacanalsp , path=/tech/CPUWAR, path=/tech/DRCEN, path=/tech/FMDPGAI, path=/tech/NandM, path=/tech/openai, path=/tech/RSAConf";
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



