function copyReff() {
    var copyText = document.getElementById('affAddress')
    navigator.clipboard.writeText(copyText.innerHTML);

    // swal("Copy", "success",{
    //     button:false
    // })
    swal({
        icon: "success",
        button: false,
        text: "Copy",
        timer: 1000

    })
}