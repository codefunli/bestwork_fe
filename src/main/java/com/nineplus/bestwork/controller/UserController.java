package com.nineplus.bestwork.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Min;

import com.nineplus.bestwork.dto.ResqCompany;
import com.nineplus.bestwork.dto.ResqUser;
import com.nineplus.bestwork.entity.TUser;
import com.nineplus.bestwork.repository.TUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import com.nineplus.bestwork.dto.TUserResponseDTO;
import com.nineplus.bestwork.services.UserService;
import com.nineplus.bestwork.utils.CommonConstants;
import com.nineplus.bestwork.utils.TokenUtils;

@PropertySource("classpath:application.properties")
@RequestMapping("/api/v1")
@RestController
public class UserController extends BaseController {

	@Autowired
	UserService userService;

	@Autowired
	TUserRepository tUserRepository;

	@Autowired
	TokenUtils tokenUtils;

	@Value("${app.login.jwtPrefix}")
	private String PRE_STRING;

//	@GetMapping("/users")
//	public ResponseEntity<? extends Object> getUserInfo(HttpServletRequest request, HttpServletResponse response) {
//		Cookie accessCookie = tokenUtils.getCookieFromRequest(request, CommonConstants.Authentication.ACCESS_COOKIE);
//		if (accessCookie != null) {
//			try {
//				String username = tokenUtils.getUserNameFromCookie(accessCookie);
//				TUserResponseDTO user = userService.convertUserToUserDto(userService.getUserByUsername(username));
//				return user != null ? success(CommonConstants.MessageCode.S1X0003, user, null)
//						: failed(CommonConstants.MessageCode.E1X0003, null);
//			} catch (Exception ex) {
//				return failed(CommonConstants.MessageCode.E1X0003, null);
//			}
//		}
//		return success(CommonConstants.MessageCode.S1X0003, null, null);
//	}

	@GetMapping("/user/{id}")
	public ResponseEntity<? extends Object> getUserById(@PathVariable String id) {
		TUserResponseDTO tUserResponseDTO = this.userService.getUserById(Long.valueOf(id));
		if (tUserResponseDTO != null){
			return success(CommonConstants.MessageCode.U0001, tUserResponseDTO, null);
		}
		return failed(CommonConstants.MessageCode.E1X0003, null);
	}

	@PostMapping("/users")
	public ResponseEntity<? extends Object> getUsers(@RequestBody(required = false) ResqUser resqUser) {
		System.err.println(resqUser);
		resqUser = getResqUser(resqUser);
		resqUser.setRole("%" + resqUser.getRole() + "%");
		resqUser.setKeyword("%" + resqUser.getKeyword() + "%");
		Sort sortable = getSorts(resqUser.getSort());
		Pageable pageable = PageRequest.of(resqUser.getPage(), resqUser.getSize(), sortable);
		Page<TUser> tUserPage = this.tUserRepository.findAllUsers(pageable, resqUser);
		return success(CommonConstants.MessageCode.U0002, tUserPage, null);
	}

	private static ResqUser getResqUser(ResqUser resqUser) {
		if (resqUser == null) {
			resqUser = new ResqUser();
		}
		if (resqUser.getPage() == null) {
			resqUser.setPage(0);
		}
		if (resqUser.getSize() == null) {
			resqUser.setSize(5);
		}
		if (resqUser.getSort() == null) {
			resqUser.setSort("id, asc");
		}
		if (resqUser.getEnabled() == null) {
			resqUser.setEnabled("");
		}
		if (resqUser.getCompanyId() == null || resqUser.getCompanyId().equals("")) {
			resqUser.setCompanyId("%%");
		}
		return resqUser;
	}

	private Sort getSorts(String sort) {
		if (sort.contains("asc")) {
			return Sort.by(Sort.Order.asc(sort.split(",")[0].replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase()));
		} else {
			return Sort.by(Sort.Order.desc(sort.split(",")[0].replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase()));
		}
	}

	@PutMapping("/user/{id}")
	public ResponseEntity<? extends Object> updateUser(@PathVariable String id, @RequestBody TUser tUser) {
		System.err.println(tUser);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/users/delete")
	public ResponseEntity<? extends Object> deleteUsers(@RequestBody(required = false) ResqUser resqUser) {
		if (resqUser == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		for (String id: resqUser.getIds()) {
			System.out.println(id);
			this.tUserRepository.deleteById(Long.valueOf(id));
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/users/create")
	public ResponseEntity<?> createUser(@RequestBody ResqUser resqUser) {
		if (resqUser == null) {
			resqUser = new ResqUser();
		}

		System.out.println(resqUser.getTUser());
		return new ResponseEntity<>(HttpStatus.OK);

	}

}
