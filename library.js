let addBook= document.querySelector(".addBook");
let submit= document.querySelector(".submit")



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
}

const myLibrary= [];


function Book(name, author, pages, read = false) {
    this.name= name;
    this.author= author;
    this.pages= pages;
    this.read= read;
    this.readMasseage= function(){
        const haveRead= this.read ? "Have read" : "Not Read";
        return `${this.name} by ${this.author} number of pages ${this.pages}, ${haveRead}`
    }
}

function addBookToLibrary(name, author, pages, read= false) {

    const book= new Book(name, author, pages, read)
    myLibrary.push(book)
    //console.log(myLibrary)
    //console.log(book)
    console.log(`Book "${book.name}" by ${book.author} added successfully! with good ${book.readMasseage()}`);
    console.table(myLibrary)
    return book
}

function clearData(name, author, pages, read) {
    name.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}
Book.prototype.toggleRead= function(){
    this.read= !this.read
    console.log(`${this.readMasseage}`)
}