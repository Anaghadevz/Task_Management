package com.task.manager.Controller;

import com.task.manager.Model.Task;
import com.task.manager.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.processing.Generated;

@RestController
@CrossOrigin(originPatterns = {"*"})
public class TaskController {

//    @Autowired
    private TaskService taskService;
    TaskController(TaskService taskService){
        this.taskService = taskService;

    }


    @PostMapping("/new")
    public ResponseEntity saveTask(@RequestBody Task task){
        return taskService.saveTask(task);
    }
    @GetMapping("/all")
    public ResponseEntity getAllTask(){
        return taskService.getAll();
    }
    @PutMapping("/update")
    public ResponseEntity updateTask(@RequestBody Task task){
        return taskService.updateTaskStatus(task);
    }

    @DeleteMapping("/delete")
    public  ResponseEntity deleteTask(@RequestBody Task task){
        return  taskService.deleteService(task);
    }

}
