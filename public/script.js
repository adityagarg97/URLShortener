$(()=>{
    let btn=$("#btn")
    let urlBox=$("#urlBox")
    let resultDiv=$("#result")
    btn.click(()=>{
        let temp=urlBox.val()
        let splitUrl=temp.split("//")
        let url=splitUrl.pop()
        $.post("/shorten/",{Url:url},(data)=>{
            resultDiv.empty()
            resultDiv.html("<a href='"+data.shortUrl+"'>"+data.shortUrl+"<\a>")
            resultDiv.hide().fadeIn("slow")
        })
    })
})