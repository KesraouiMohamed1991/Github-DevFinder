
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme-switcher");
  const selection = (id) => {
    return document.getElementById(id);
  };
  const imageProfil = selection("image-profil");
  const Name = selection("name");
  const user = selection("user");
  const bio = selection("bio");
  const locationName = selection("location");
  const blog = selection("blog");
  const twitterAccount = selection("twitter-account");
  const company = selection("company");
  const joined = selection("joined");
  const repos = selection("repos");
  const input = selection("input");
  const btn = selection("btn");
  const Followers = selection("Followers");
  const Following = selection("Following");
  const x = selection("x");
  const themetxt = selection("theme")
  const themeicon = selection("themeicon")
  const star = selection("star")
  const clear = selection("clear")
  const popUp = selection("pop-up")
  const ulList = selection("ul-list")
  const favToggle = selection("fav-toggle")
  const XToggle = selection("X-toggle")
  let key = "";
  x.style.display = "none";


  btn.addEventListener("click", function (e) {
    if (input.value.length === 0 || input.value === null || input.value === '') {
      console.log('error')
      alert("Please enter a GitHub username.");
    } else {
      e.preventDefault();

      let inputQuery = input.value;
      console.log(inputQuery);
      key = inputQuery;

      const apiUrl = `https://api.github.com/users/${key} `;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the data
          console.log(data);

          const updateinfo = (info) => {
            imageProfil.src = info.avatar_url;
            Name.textContent = info.name || "Not Available"; // Display "Not Available" if name is empty
            bio.textContent = info.bio || "Not Available"; // Display "Not Available" if bio is empty
            user.textContent = `@${info.login}`;
            joined.textContent = `joined ${info.created_at.slice(0, 10)}`;
            blog.textContent = info.blog || "Not Available"; // Display "Not Available" if blog is empty
            twitterAccount.textContent = info.twitter_username || "Not Available"; // Display "Not Available" if twitter_username is empty
            company.textContent = info.company || "Not Available"; // Display "Not Available" if company is empty
            repos.textContent = info.public_repos;
            Followers.textContent = info.followers;
            Following.innerHTML = info.following;
            locationName.textContent = info.location || "Not Available"; // Display "Not Available" if location is empty
          };

          updateinfo(data);





          star.addEventListener('click', addFavorites)




        })


        .catch((error) => {
          console.log("There was a problem with the fetch operation:", error);
        });
    }
  });



  const switchTheme = () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {

      themetxt.textContent = 'Light';
      themeicon.src = `./src/assets/icon-sun.svg`

    } else if (!document.documentElement.classList.contains("dark")) (
      themetxt.textContent = 'Dark',
      themeicon.src = `./src/assets/icon-moon.svg`
    )
  };

  const visibility = () => {
    if (input.value.length !== 0) {
      x.style.display = "block";
    }
  };


  const addFavorites = () => {

    const localStorgeContent = localStorage.getItem('DataString');
    let DataString;

    if (localStorgeContent === null) {
      DataString = [];
    } else {
      DataString = JSON.parse(localStorgeContent);
    }

    if (!DataString.includes(key)) {
      DataString.push(key);
    }



    localStorage.setItem("DataString", JSON.stringify(DataString));

  }

  const showfavorites = () => {
    let content = '';


    // Check if a specific item exists in localStorage
    if (localStorage.getItem('DataString')) {
      DataString = JSON.parse(localStorage.getItem('DataString'));
      // Data with the specified key exists in localStorage
      console.log('Data exists:', localStorage.getItem('DataString'));



      for (let index = 0; index < DataString.length; index++) {
        content += `<li class="w-full text-red-800 ">${index+1}-${DataString[index]}</li>`;
      }
      console.log(content)
      ulList.innerHTML = content;

    } else {

      console.log('No data found.');
      ulList.innerHTML = `<li class="w-full text-red-800">No account in favories </li>`;

    }





  }


  favToggle.addEventListener('click', () => {
    popUp.classList.toggle('hidden');
    showfavorites()

  });


  XToggle.addEventListener('click', function () {
    popUp.classList.toggle('hidden');


  })


  x.addEventListener("click", function () {

    x.style.display = "none";
    input.value = "";
  });



  input.addEventListener("change", visibility);
  themeToggle.addEventListener("click", switchTheme);
  clear.addEventListener('click', function () {
    localStorage.clear()

  })


});

