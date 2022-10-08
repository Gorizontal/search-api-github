

const USER_PER_PAGE = 20;
 
export class Search {
    constructor(view){ 
        this.view = view;  
        this.view.searchInput.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500));
        this.view.loadMore.addEventListener('click', this.loadUsers.bind(this));
        this.currentPage = 1;
       
        
    }
    setCurrentPage(pageNumber){
        this.currentPage = pageNumber
    }
    async loadUsers(){
        console.log(this.view.searchInput)
        console.dir(this.view.searchInput)
        const searchValue = this.view.searchInput.value
        if(searchValue){
            return await fetch(`https://api.github.com/search/users?q=${this.view.searchInput.value}&per_page=${USER_PER_PAGE}&page=${this.currentPage}`)
            .then((res)=>{ 
                if(res.ok){
                    console.log(res)
                    this.setCurrentPage(this.currentPage + 1);
                    res.json().then((res)=>{
                        res.items.forEach((user)=>{this.view.createUser(user)})
                    })
                }  else {

                }
            })} else {this.clearUsers()}
            }

            clearUsers(){
                this.view.usersList.innerHTML = '';
            }

            debounce(func, wait, immediate){
                let timeout;
                return function(){
                    const context = this, args = arguments;
                    const later = function(){
                        timeout = null;
                        if(!immediate){func.apply(context, args)}
                    }
                    const callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if(callNow){func.apply(context, args)}
                }
            }

}

