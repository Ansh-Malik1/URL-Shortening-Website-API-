const submit = document.querySelector(".submit")

const input = document.querySelector(".ip")
const op = document.querySelector(".output")
const displays = document.querySelectorAll(".display")
const copyBtns = document.querySelectorAll(".copy")
const loader = document.querySelector(".loader")
input.value=""
function showOutput(data){
    displays[0].value = data.short_link
    displays[1].value = data.short_link2
    displays[2].value = data.short_link3
    op.style.cssText="display:grid ; opacity:1"
}
async function getData(link){
    try{
        loader.style.cssText="display:block"
        const res = await fetch (`https://api.shrtco.de/v2/shorten?url=${link}`)
        const data = await res.json()
        console.log(data.result)
        loader.style.cssText="display:none"
        if(data){
            showOutput(data.result)
        }
        
    }
    catch(err){
        alert("The link you entered is a disallowed link or it is empty, for more infos see shrtco.de/disallowed+")
        input.value=""
    }
}
submit.addEventListener("click" , (e)=>{
    e.preventDefault()
    const link = input.value
    getData(link) 
})

copyBtns.forEach((e)=>{
    e.addEventListener("click" , (event)=>{
        event.target.innerHTML = "Copied"
        event.target.style.cssText=" background-color: hsl(255, 11%, 22%) ;"
        let text =  event.target.previousElementSibling.value
        console.log(text)
        setTimeout(()=>{
            event.target.innerHTML = "Copy"
            event.target.style.cssText=" background-color: hsl(180, 66%, 49%) ;"
        },2000)
        navigator.clipboard.writeText(text);
    })
})