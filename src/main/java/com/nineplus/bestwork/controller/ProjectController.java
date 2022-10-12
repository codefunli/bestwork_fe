package com.nineplus.bestwork.controller;

import java.util.Collection;

import javax.security.auth.message.callback.SecretKeyCallback.Request;
import javax.validation.constraints.Min;

import com.nineplus.bestwork.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nineplus.bestwork.entity.TProject;
import com.nineplus.bestwork.exception.BestWorkBussinessException;
import com.nineplus.bestwork.services.ProjectService;
import com.nineplus.bestwork.utils.CommonConstants;

/**
 * This controller use for processing with project
 *
 * @author tuanna
 */
@RestController
@RequestMapping("/api/v1")
public class ProjectController extends BaseController {

    @Autowired
    private ProjectService projectService;

    /**
     * Get all projects
     *
     * @return all projects
     */
    @PostMapping("/projects")
    public ResponseEntity<? extends Object> getAllProject(@RequestBody(required = false) ResqProject resqProject) {
        if (resqProject == null) {
            resqProject = new ResqProject();
        }
        Sort sortable = getSorts(resqProject.getSort());
        Pageable pageable = PageRequest.of(resqProject.getPage(), resqProject.getSize(), sortable);
        Page<TProject> projects = projectService.getAll(pageable);

        return success(CommonConstants.MessageCode.S1X0001, projects, null);
    }

    private Sort getSorts(String sort) {
        if (sort.contains("asc")) {
            return Sort.by(Sort.Order.asc(sort.split(",")[0].replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase()));
        } else {
            return Sort.by(Sort.Order.desc(sort.split(",")[0].replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase()));
        }
    }

}
