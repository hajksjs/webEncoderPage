<?php  
$videolist=array(
		

				'size:1280x720;format:uyvy422;fps:50000/1000;index:14'=>'uyvy422 1280x720 50000/1000fps',
				'size:1280x720;format:uyvy422;fps:60000/1000;index:16'=>'uyvy422 1280x720 60000/1000fps',

				'size:1920x1080;format:uyvy422;fps:25000/1000;index:5'=>'1920x1080 @ 25fps',
				'size:1920x1080;format:uyvy422;fps:30000/1000;index:7'=>'1920x1080 @ 30fps',
				
				'size:2048x1080;format:uyvy422;fps:24000/1000;index:18'=>'2048x1080 @ 24fps',
				'size:2048x1080;format:uyvy422;fps:25000/1000;index:19'=>'2048x1080 @ 25fps',
				'size:3840x2160;format:uyvy422;fps:24000/1000;index:21'=>'3840x2160 @ 24fps',
				'size:3840x2160;format:uyvy422;fps:25000/1000;index:22'=>'3840x2160 @ 25fps',
				'size:3840x2160;format:uyvy422;fps:30000/1000;index:24'=>'3840x2160 @ 30fps',
				'size:4096x2160;format:uyvy422;fps:24000/1000;index:26'=>'4096x2160 @ 24fps',
				'size:4096x2160;format:uyvy422;fps:25000/1000;index:27'=>'4096x2160 @ 25fps');
echo json_encode($videolist);  

?>  
