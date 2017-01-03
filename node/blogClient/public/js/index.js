$(function() {
	loadPost()
})

function addPost() {
	var post = $("#post").val()
	if(post.length === 0) {
		alert("请输入内容")
		return
	}
	$.post("http://localhost:2000/blog", {post:post}, function(data) {
		$("#post").val("")
		loadPost()
	})
}

function loadPost() {
	$.get("http://localhost:2000/blogs", function(data) {
		var html = ""
		for (var item of data) {

			let localTime = moment(item.postTime).format('YYYY-MM-DD HH:mm')
			html += `<li>${item.post}&nbsp;${localTime}</li>`
		}
		$("#blogs").html(html)
	})
}