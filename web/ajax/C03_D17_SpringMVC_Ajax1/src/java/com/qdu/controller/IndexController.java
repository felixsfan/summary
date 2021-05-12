package com.qdu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping({"/index", "/"})
    public String index() {
        return "index";
    }

    @RequestMapping("/toTest1")
    public String toTest1() {
        return "test1";
    }

    @RequestMapping("/toTest2")
    public String toTest2() {
        return "test2";
    }

    @RequestMapping("/toTest3")
    public String toTest3() {
        return "test3";
    }

    @RequestMapping("/toTest4")
    public String toTest4() {
        return "test4";
    }

    @RequestMapping("/toTest4_5")
    public String toTest4_5() {
        return "test4_5";
    }

    @RequestMapping("/toTest6")
    public String toTest6() {
        return "test6";
    }

    @RequestMapping("/toTest7")
    public String toTest7() {
        return "test7";
    }

}
