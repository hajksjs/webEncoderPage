<?php  
$videoprocess=array('hflip'=>'hflip',
                    'vflip'=>'vflip',
                    'removegrain=m3=24'=>'denoise', 
                    'yadif'=>'deinterlace', 
                    'bwdif'=>'deinterlace2', 
                    'deshake'=>'deshake',               
                    'scale'=>'scale',                     
                    'smartblur'=>'blur',
                    'unsharp'=>'blur2',
                    'sharpen'=>'sharpen'     
                    );
echo json_encode($videoprocess);  

?>  
