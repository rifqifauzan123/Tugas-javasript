"use strict";



const roll = document.querySelector("#roll-no");
const karyawanName = document.querySelector("#karyawan-name");
const pegawai = document.querySelector("#pegawai");
const kerja = document.querySelector("#kerja");
const subject = document.querySelector("#subject");
const submitBtn = document
  .querySelector(".btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // const roll = document.querySelector("#roll-no");
    // const karyawanName = document.querySelector("#karyawan-name");
    // const subject = document.querySelector("#subject");
    var select = document.getElementById("store");
    var selectData = select.options[select.selectedIndex].text;
    let karyawanData = [];
    let allRollNumbers = [];
    allData().forEach((num) => {
      allRollNumbers.push(num.Roll);
    });
    // console.log(allRollNumbers);
    if (
      roll.value !== "" &&
      karyawanName.value !== "" &&
      pegawai.value !== "" &&
      kerja.value !== "" &&
      subject.value !== "" &&
      !allRollNumbers.includes(roll.value)
    ) {
      var inputData = {
        Roll: roll.value,
        name: karyawanName.value,
        pegawai: pegawai.value,
        kerja: kerja.value,
        subjet: subject.value,
        storage: selectData,
      };
      if (inputData.storage === "localStorage") {
        let karyawansLocal = JSON.parse(localStorage.getItem("karyawan"));
        if (karyawansLocal === null) {
          karyawansLocal = [];
          karyawansLocal.push(inputData);
          localStorage.setItem("karyawan", JSON.stringify(karyawansLocal));
        } else {
          karyawansLocal.push(inputData);
          localStorage.setItem("karyawan", JSON.stringify(karyawansLocal));
        }
      } else if (inputData.storage === "SeasionStorage") {
        let karyawansSession = JSON.parse(sessionStorage.getItem("karyawan"));
        if (karyawansSession === null) {
          karyawansSession = [];
          karyawansSession.push(inputData);
          sessionStorage.setItem("karyawan", JSON.stringify(karyawansSession));
        } else {
          karyawansSession.push(inputData);
          sessionStorage.setItem("karyawan", JSON.stringify(karyawansSession));
        }
      } else {
        let karyawansCookie = document.cookie;
        if (karyawansCookie === "") {
          karyawansCookie = [];
          karyawansCookie.push(inputData);
          document.cookie = `karyawan = ${JSON.stringify(karyawansCookie)}`;
        } else {
          karyawansCookie = karyawansCookie.split("=");
          karyawansCookie = JSON.parse(karyawansCookie[1]);
          karyawansCookie.push(inputData);
          document.cookie = `karyawan = ${JSON.stringify(karyawansCookie)}`;
        }
      }
    } else {
      alert("Please from fill properl and Check your RollNumber...!");
    }
    window.location.reload();
  });

const allData = function () {
  const localDataStorages = JSON.parse(localStorage.getItem("karyawan")) || [];
  const secDataStoreages = JSON.parse(sessionStorage.getItem("karyawan")) || [];
  const cookiesData = document.cookie;
  const cookiesDataSplit = cookiesData.split("=")[1];
  const jsonData = (cookiesDataSplit && JSON.parse(cookiesDataSplit)) || [];
  const localSecCookieData = [
    ...localDataStorages,
    ...secDataStoreages,
    ...jsonData,
  ];
  return localSecCookieData;
};
// console.log(allData());
// data rendring data function;;;;;;;
function showElem() {
  allData().map((itms) => {
    const textOnBrowser = document.querySelector(".all-txt");
    textOnBrowser.innerHTML += renderHTMLText(itms);
  });
}

const renderHTMLText = (detailObj) => {
  return `
  <div class="box">
          <p class="txt-roll">Pilihan - ${detailObj.Roll}</p>
          <p class="txt-name">Name - ${detailObj.name}</p>
          <p class="txt-subject">Nomor Telphone - ${detailObj.subjet}</p>
          <p class="txt-pegawai">Posisi - ${detailObj.pegawai}</p>
          <p class="txt-kerja">kerja - ${detailObj.kerja}</p>
          <p class="txt-storage">Storage - ${detailObj.storage}</p>
          <div class="edit-delete-btn" id="edits">
              <button class="edit-btn" id="${detailObj.Roll}">edit</button>
              <button class="delete-btn" id="${detailObj.Roll}">Delete</button>
            </div>
        </div>
      </div>
  `;
};
showElem();


// edit btn
const editBtn = document.querySelectorAll(".edit-btn");
editBtn.forEach((allEditBtn) => {
  allEditBtn.addEventListener("click", function (e) {
      const removeDeleteBtn = document.querySelector(".delete-btn").remove()
    let localDataEdit = JSON.parse(localStorage.getItem("karyawan"));
    let secDataEdit = JSON.parse(sessionStorage.getItem("karyawan"));
    let cookieDataEdit = document.cookie;
    let splitOfCookieEdit =
      cookieDataEdit && JSON.parse(cookieDataEdit.split("=")[1]);
    const findIndex = allData().find((objEdit) => {
      return objEdit.Roll === e.target.id;
    });
    const typeEdit = findIndex.storage;
    pegawai.value = findIndex.pegawai;
    kerja.value = findIndex.kerja;
    roll.value = findIndex.Roll;
    karyawanName.value = findIndex.name;
    subject.value = findIndex.subjet;
    if (typeEdit === "localStorage") {
      const filteredLocalDataEdit = localDataEdit.filter((delEditItm) => {
        return delEditItm.Roll !== e.target.id;
      });
      localStorage.setItem("karyawan", JSON.stringify(filteredLocalDataEdit));
    } else if (typeEdit === "SeasionStorage") {
      const filteredSecDataEdit = secDataEdit.filter((delSecEditItm) => {
        return delSecEditItm.Roll !== e.target.id;
      });
      sessionStorage.setItem("karyawan", JSON.stringify(filteredSecDataEdit));
    } else {
      const filteredCookieDataEdit = splitOfCookieEdit.filter(
        (delCokieEditItm) => {
          return delCokieEditItm.Roll !== e.target.id;
        }
      );
      document.cookie = `karyawan = ${JSON.stringify(filteredCookieDataEdit)}`;
    }
  });
});

// delete-btn from browser...!
const deleteBtn = document.querySelectorAll(".delete-btn");
deleteBtn.forEach((l) => {
  l.addEventListener("click", function (e) {
    console.log("i am clicked..!", e.target.id);
    let localData = JSON.parse(localStorage.getItem("karyawan"));
    const vishal = sessionStorage.getItem("karyawan");
    let secData = vishal && JSON.parse(vishal);
    let cookieData = document.cookie;
    let splitOfCookie = cookieData && JSON.parse(cookieData.split("=")[1]);
    const findIndex = allData().find((obj) => {
      return obj.Roll === e.target.id;
    });
    const type = findIndex.storage;
    if (type === "localStorage") {
      const filteredLocalData = localData.filter((delItm) => {
        return delItm.Roll !== e.target.id;
      });
      localStorage.setItem("karyawan", JSON.stringify(filteredLocalData));
      window.location.reload();
    } else if (type === "SeasionStorage") {
      const filteredSecData = secData.filter((delSecItm) => {
        return delSecItm.Roll !== e.target.id;
      });
      sessionStorage.setItem("karyawan", JSON.stringify(filteredSecData));
      window.location.reload();
    } else {
      const filteredCookieData = splitOfCookie.filter((delCokieItm) => {
        return delCokieItm.Roll !== e.target.id;
      });
      document.cookie = `karyawan = ${JSON.stringify(filteredCookieData)}`;
      window.location.reload();
    }
  });
});
