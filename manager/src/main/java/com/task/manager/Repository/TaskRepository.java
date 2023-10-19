package com.task.manager.Repository;

import com.task.manager.Model.Task;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface TaskRepository extends MongoRepository<Task,Long> {
}
