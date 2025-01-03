let addBook= document.querySelector(".addBook");
let submit= document.querySelector(".submit")
const myLibrary= []
let id= 0




function register() {
    
    let name= document.createElement('input');
    name.setAttribute("type","text")
    let author= document.createElement('input');
    author.setAttribute("type","text")
    let pages= document.createElement('input');
    pages.setAttribute("type","number")
    let read= document.createElement('input')
    read.setAttribute("type","checkbox")
    let save= document.createElement('button')
    save.setAttribute("type","submit")
    save.innerHTML="Save"
    let cancel= document.createElement('button')
    cancel.setAttribute("type","reset")
    cancel.innerHTML= "Cancel"
    submit.append(name, author, pages, read, save, cancel)
      

    save.addEventListener("click", ()=>{
        if (
               name.value.trim() !== ""
            && author.value.trim() !== "" // Removes the leading and trailing white space
            && pages.value.trim()  !== "" // and line terminator characters from a string.
            && pages.value >= 10 
            && pages.value <= 999){
                const bookName= name.value.trim();
                const bookAuthor= author.value.trim();
                const bookPages= pages.value.trim();
                const bookRead= read.checked;
                addBookToLibrary(bookName, bookAuthor, bookPages, bookRead);
                clearData(name, author, pages, read)
        }
        else{ 
            console.log("please fill all fields")// --------- Should write Message to fill the missing
        }
    })
    cancel.addEventListener('click', () =>{
        clearData(name,author, pages, read)
        submit.style.display="none"
    })
}




function Book(name, author, pages, read) {
    this.name= name;
    this.author= author;
    this.pages= pages;
    this.read= read;
}

function addBookToLibrary(name, author, pages, read){
    const book = new Book(name, author, pages, read);
    myLibrary.push(book);
    const showBooks=document.querySelector('table')

     // Clear any previous table content before adding new rows
     //showBooks.innerHTML = '';
    
    for(let i = 0; i < myLibrary.length; i++){
        newObject= myLibrary
        console.log(newObject)
        // Adding the read box:
        let read= document.createElement('input')
        read.setAttribute('type','checkbox')
        read.checked=book.read

        // remove button
        let removeBtn= document.createElement('button')
        removeBtn.setAttribute('type','reset')

        //const book= myLibrary[i];
        showBooks.style.cssText+=`
        background-color:lightgreen;
        color:white;
        margin: 20px 30px;
        width:240px;
        height: 280px;
        padding: 10px 20px;
        border-radius: 5px;
        `
        showBooks.innerHTML +=`
            <tr>
                <th>Name: ${book.name}</th>
            </tr>
            <tr>
                <td>Author: ${book.author}</td>
            </tr>
            <tr>
                <td>Pages Number: ${book.pages}</td>
            </tr>
            <tr>
                <td>${book.read ? "read": "not read"}</td>
                <td>${read.outerHTML}</td>
            </tr>
            <tr>
                <td><buton class='removeBtn' id='removeBtn'>delete ${removeBtn.outerHTML}</button></td>
            </tr>
            
        `

        removeBtn.addEventListener('click', ()=> {
                    myLibrary.splice(0,1)
                    console.log("Delteing")
                })
        read.addEventListener('change',() =>{
            book.read= read.checked
        })
    return book
    }
}
// Ensure no lingring readMassage exists
delete Book.prototype.readMasseage;
myLibrary.forEach(book =>{
    if( book.hasOwnProperty('readMasseage')){
        delete book.readMasseage;
    }
})

// Clear Data:
function clearData(name, author, pages, read) {
    name.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}
// Adding new function Belong to Book:
Book.prototype.toggleRead= function(){
    this.read= !this.read
    console.log(`${this.readMasseage}`)
}

// const book= new Book( name="odin", author="Omer", pages="339", read="true")
//     const book1= new Book(name="clean Codes", author="Stive Oliver", pages="490", read="true")
//     const book2= new Book(name="Streets", author="Peter smith", pages="100", read="false")