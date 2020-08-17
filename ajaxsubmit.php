<?php 


   if (isset($_POST['callFunc1'])) {

      $email = $_POST['callFunc1'];

      $service_url = 'https://haveibeenpwned.com/api/v3/breachedaccount/'.$email.'?truncateResponse=false';

        $ch = curl_init ($service_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt ($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'hibp-api-key: 8bc0a97bb7904af587670cc082e1bc11',
          'user-agent: FAUstudentproject'
          ));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $returndata = curl_exec($ch);
        $status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); 
        //print_r($status_code);
        //print_r(json_decode($returndata));

        echo $returndata;

        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
            $info = curl_getinfo($ch);
            $json = curl_close($ch);
            die('error occured during curl exec. Additioanl info: ' . var_export($info));
        }

        curl_close($ch);
        $decoded1 = json_decode($curl_response,true);

        if (isset($decoded1->response->status) && $decoded1->response->status == 'ERROR') {
            echo curl_getinfo($ch);
            die('error occured: ' . $decoded1->response->errormessage);
        }

   }

   if(isset($_POST['callFunc2'])){

      //not functional atm

      $pw_sha = sha1($_POST['callFunc2']);
      $pw_sha_sub = substr($pw_sha,0,5);

      $service_url = 'https://api.pwnedpasswords.com/range/'.$pw_sha_sub;

      $ch = curl_init ($service_url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt ($ch, CURLOPT_HTTPGET, true);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      $returndata = curl_exec ($ch);
      $status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); 
      //print_r($status_code);

      echo $pw_sha."\n";
      echo $returndata;
      //print_r($returndata);

      $curl_response = curl_exec($ch);
      if ($curl_response === false) {
          $info = curl_getinfo($ch);
          $json = curl_close($ch);

          die('error occured during curl exec. Additioanl info: ' . var_export($info));
      }

      curl_close($ch);
      $decoded1 = json_decode($curl_response,true);

      if (isset($decoded1->response->status) && $decoded1->response->status == 'ERROR') {

            echo "hello";
          echo curl_getinfo($ch);

          die('error occured: ' . $decoded1->response->errormessage);
      }
   }


/*

   if(isset($_POST['password']))
   {
         
      //Fetching Values from URL
      $password=$_POST['password'];


      $password = sha1($_POST["password"]);
      echo json_encode(array("password"=> $password))

   }

//$doc = new DOMDocument();
          //$doc->loadHTMLFile("http://stackoverflow.com/")

                $service_url = 'https://haveibeenpwned.com/api/v3/breachedaccount/ryanwahler@outlook.com?truncateResponse=false';
                //$service_url = 'https://haveibeenpwned.com/range/aaf4c';
                

                $ch = curl_init ($service_url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt ($ch, CURLOPT_HTTPGET, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                  'hibp-api-key: 8bc0a97bb7904af587670cc082e1bc11',
                  'user-agent: FAUstudentproject'
                  ));
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                $returndata = curl_exec ($ch);
                $status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); 
                print_r($status_code);
                print_r($returndata);

                $curl_response = curl_exec($ch);
                if ($curl_response === false) {
                    $info = curl_getinfo($ch);
                    $json = curl_close($ch);

                    die('error occured during curl exec. Additioanl info: ' . var_export($info));
                }

                curl_close($ch);
                $decoded1 = json_decode($curl_response,true);

                if (isset($decoded1->response->status) && $decoded1->response->status == 'ERROR') {

                  echo "hello";
                    echo curl_getinfo($ch);

                    die('error occured: ' . $decoded1->response->errormessage);
                }
                echo 'response ok!';

                print_r(json_decode($json));
                print_r(json_decode($decoded1));

                echo $decoded1;

                var_export($decoded1->response);


















                
              //scrape site 
              $doc = new DOMDocument();
              $html->file_get_contents("https://api.pwnedpasswords.com/range/".$pw_sha_sub);
              libxml_use_internal_errors(TRUE); //disable libxml errors
              if(!empty($html)){ //if any html is actually returned

                $doc->loadHTML($html);
                libxml_clear_errors(); //remove errors for yucky html
                
                $doc_xpath = new DOMXPath($pokemon_doc);
              
                $list = $doc->getElementsByTagName('pre');

                //get all the h2's with an id
                $doc_row = $pokemon_xpath->query('//h2[@id]');
              
                foreach ($list as $contact) { 
                    echo $contact->nodeValue, PHP_EOL; 
                }
*/
?>

