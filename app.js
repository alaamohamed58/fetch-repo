let submitBtn = document.querySelector("button"),
  output = document.querySelector(".output ul"),
  userNameInput = document.getElementById("name");

//form prevent Default
document.forms[0].onsubmit = (e) => e.preventDefault();

const fetchData = async (apiUrl) => {
  let div = document.createElement("p");
  div.id = "loading";
  output.append(div);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      let li = document.createElement("li");
      li.textContent = data[i].name;
      output.appendChild(li);
      console.log(data[i].name);
    }
  } catch (er) {
    let p = document.createElement("p");
    p.textContent = "Failed To fetch data";
    output.appendChild(p);
    console.log(er);
  }
  div.remove();
};

submitBtn.onclick = () => {
  output.innerHTML = "";
  fetchData(`https://api.github.com/users/${userNameInput.value}/repos`);
};
