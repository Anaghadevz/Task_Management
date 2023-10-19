package com.task.manager.Service;

import com.task.manager.Model.Task;
import org.springframework.http.ResponseEntity;

public interface TaskInterface {
    ResponseEntity<Task> saveTask(Task task);

    ResponseEntity updateTaskStatus(Task task);

    ResponseEntity getAll();

    ResponseEntity deleteService(Task task);
}
