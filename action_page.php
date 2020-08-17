<?php

    function checkSafeBrowsing($longUrl) {
        global $safebrowsing;
        $url = $safebrowsing['api_url']."?client=api&";
        $url .= "apikey=".$safebrowsing['api_key']."&appver=1.0&";
        $url .= "pver=3.0&url=".urlencode($longUrl);
        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
}