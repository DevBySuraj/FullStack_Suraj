package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @Autowired
    private JobRepository repository;

    // GET: Fetch all jobs for the React list
    @GetMapping
    public List<Job> getJobs() {
        return repository.findAll();
    }

    // POST: Save a new job from the React form
    @PostMapping
    public Job saveJob(@RequestBody Job job) {
        return repository.save(job);
    }
}		