export class View {
    constructor(api){
        this.api = api;

        this.app = document.getElementById('app');

        this.title = this.createElements('h1', 'title');  
        this.title.textContent = 'GitHub search users';

        this.searchLine = this.createElements('div', 'search-line');
        this.searchInput = this.createElements('input', 'search-input');
        this.searchCounter = this.createElements('span', 'counter');
        
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);
        

        this.usersWrapper = this.createElements('div', 'users-wrapper');
        this.usersList = this.createElements('ul', 'users');
        this.usersWrapper.append(this.usersList);

        this.main = this.createElements('div', 'main');
        this.main.append(this.usersWrapper);

        this.loadMore = this.createElements('button', 'btn');
        this.loadMore.textContent = 'Загрузить ещё';
        this.usersWrapper.append(this.loadMore);
        this.loadMore.style.display = 'none';

        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.app.append(this.main);   

    }

    createElements(elementTag, elementClass){
        const element = document.createElement(elementTag);
        if(elementClass){
            element.classList.add(elementClass)
        }
        return element;
    }
    createUser(userData){
        const userElement = this.createElements('li', 'user-prev')
        userElement.addEventListener('click', () => {this.showUserData(userData)})
        userElement.innerHTML = `<img class= "user-prev-photo" src="${userData.avatar_url}" alt= "${userData.login}"  >
                                 <span class="user-prev-name">${userData.login}</span>`;
        this.usersList.append(userElement);
    }

    showUserData(userData){
        
        const userEL = this.createElements('div', 'user');
       if(document.querySelector('.user')){document.querySelector('.user').remove()}
        
        this.api.loadUsersData(userData.login)
                    .then(res => {
                        const [following, followers, repos] = res;
                        const followingList = this.createDatList(following, 'Following')
                        const followersList = this.createDatList(followers, 'Followers')
                        const reposList = this.createDatList(repos, 'Repos')
                        if(userEL.innerHTML) {userEL.innerHTML = ''}
                        userEL.innerHTML = `<img src="${userData.avatar_url}" alt= "${userData.login}">
                        <h2>${userData.login}</h2>
                        ${followingList}
                        ${followersList}
                        ${reposList} `
                    })
        this.main.append(userEL);
    }

    createDatList(list, title){
        const block = this.createElements('div', 'user-block');
        const titleTag = this.createElements('h3', 'user-block-title');
        const listTag = this.createElements('ul', 'user-list');
        titleTag.textContent = title;

        list.forEach(item => {
            const el = this.createElements('li', 'user-list-item');
            el.innerHTML = `<a href="${item.html_url}">${item.login ? item.login : item.name}</a>`

            listTag.append(el)
        })

        block.append(titleTag);
        block.append(listTag);


        return block.innerHTML;


    }

    toggleReloadMore(show){
        this.loadMore.style.display = show ? 'block' : 'none';
    }


    setCounterMessage(message){
        this.searchCounter.textContent = message
    }

}