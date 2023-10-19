package com.task.manager.Service;


import com.task.manager.Model.Task;
import com.task.manager.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService implements TaskInterface {

    @Autowired
    private TaskRepository taskRepository;


    @Override
    public ResponseEntity<Task> saveTask(Task task){
        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
    }

    @Override
    public ResponseEntity updateTaskStatus(Task task){
        Optional<Task> task1 = taskRepository.findById(task.getId());
        if(task1.isPresent()){
            return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
        }


    }

    @Override
    public ResponseEntity getAll() {
        return new ResponseEntity(taskRepository.findAll(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteService(Task task) {

        try{
            taskRepository.delete(task);
            return new ResponseEntity("Deleted successfully!",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity("Delete failed!!",HttpStatus.OK);
        }

    }


}
