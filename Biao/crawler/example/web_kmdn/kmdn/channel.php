<?php
    $ret = array('status' => 0, 'msg' => '');
    $filename = "./paras";
    $file = fopen( $filename, "w" );
    foreach ($_POST as $key => &$val) 
    {
        fwrite( $file,  $key . "=" . $_POST[$key] . "\n");
    }
    fclose( $file );
    
    $cmd = '/usr/bin/python python/' . $_POST['prog'] . '.py';
    $hd = popen($cmd , "r");
    $contents = "";
      do {
        $data = @fread($hd, 8192);
        if (strlen($data) == 0) {
          break;
        }
        $contents .= $data;
      } while(true);
    //$data = fread($hd, 102400);
    pclose($hd);
    $ret['cmd'] = $cmd;
    $ret['data'] = $contents;
    echo json_encode($ret);
?>
