export class View {
    constructor(){
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
        userElement.innerHTML = `<img class= "user-prev-photo" src="${userData.avatar_url}" alt= "${userData.login}"  >
                                 <span class="user-prev-name">${userData.login}</span>`;
        this.usersList.append(userElement);
    }
    toggleReloadMore(show){
        this.loadMore.style.display = show ? 'block' : 'none'
    }

}