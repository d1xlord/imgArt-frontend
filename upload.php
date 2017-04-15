<?php
if ( !empty( $_FILES ) ) {
    $meta = $_POST;
    $filename = $meta['fileName'] . '.jpg';
    $destination = $meta['targetPath'] . $filename;
    move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
    echo $json;
} else {
    echo 'No files';
}
?>