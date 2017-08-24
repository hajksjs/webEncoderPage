<?php  
$videolist=array(
				'size:2048x1080;format:uyvy422;fps:24000/1000;index:18'=>'2048x1080 @ 24fps',
				'size:2048x1080;format:uyvy422;fps:25000/1000;index:19'=>'2048x1080 @ 25fps',
				'size:3840x2160;format:uyvy422;fps:24000/1000;index:21'=>'3840x2160 @ 24fps',
				'size:3840x2160;format:uyvy422;fps:25000/1000;index:22'=>'3840x2160 @ 25fps',
				'size:3840x2160;format:uyvy422;fps:30000/1000;index:24'=>'3840x2160 @ 30fps',
				'size:3840x2160;format:uyvy422;fps:50000/1000;index:25'=>'3840x2160 @ 50fps',
				'size:3840x2160;format:uyvy422;fps:50000/1001;index:27'=>'3840x2160 @ 60fps',
				'size:4096x2160;format:uyvy422;fps:24000/1000;index:29'=>'4096x2160 @ 24fps',
				'size:4096x2160;format:uyvy422;fps:25000/1000;index:30'=>'4096x2160 @ 25fps');
echo json_encode($videolist);  

?>  
