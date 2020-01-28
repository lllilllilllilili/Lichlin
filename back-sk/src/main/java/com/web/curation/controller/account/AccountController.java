package com.web.curation.controller.account;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.User;

import com.web.curation.service.AcountService;
import com.web.curation.service.JwtService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
		@ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
		@ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
		@ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class AccountController {

	@Autowired
	AcountService service;

	@Autowired
	UserDao userDao;

	@Autowired
	private JwtService jwtService;

	@PostMapping("/account/login")
	@ApiOperation(value = "로그인")
	public Object login(@RequestParam(required = true) final String email,
			@RequestParam(required = true) final String password) {

		System.out.println("&&&&&&&&&&&&&&&login");
		System.out.println(email + "==========" + password);

		final BasicResponse result = new BasicResponse();
		JSONObject dummyToken = new JSONObject();
		JSONObject dummyUser = new JSONObject();

		User tmp = service.login(email, password);

		// 1. DB 에 값이 존재하는지 판단
		if (tmp == null) {
			System.out.println("X");
			result.status = false;
			result.data = "email이 존재하지않습니다";

		} else {
			// 2. email과 pw일치하는지 판단
			dummyUser.put("email", email);
			dummyUser.put("nickname", tmp.getNickname());

			if (tmp.getPw() == "") {
				result.status = false;
				result.data = "비밀번호가 일치하지 않습니다";
				result.object = dummyUser.toMap();
			} else {
				result.status = true;
				result.data = "success";
				dummyToken.put("token", jwtService.makeJwt(tmp));
				dummyToken.put("user", dummyUser);

				result.object = dummyToken.toMap();
			}

		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/account/signup")
	@ApiOperation(value = "가입하기")
	public Object signup(@RequestBody User request) {

		final BasicResponse result = new BasicResponse();
		System.out.println("###########가입하기"+request.toString());
		User tmp = service.signup(request);
		
		if (tmp.getEmail().equals("")) {
			result.status = false;
			result.data = "생성 실패(이메일 중복)";
			return new ResponseEntity<>(result, HttpStatus.OK);

		} else if (tmp.getNickname().equals("")) {
			result.status = false;
			result.data = "생성 실패(닉네임 중복)";
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
		
		result.status = true;
		result.data = "회원 가입 성공";
		result.object = new JSONObject(request).toMap();

		return new ResponseEntity<>(result, HttpStatus.OK);

	}

	@DeleteMapping("/account/delete")
	@ApiOperation(value = "삭제하기")
	public Object delete(@RequestParam(required = true) final String email) {
		// 이메일, 닉네임 중복처리 필수
		// 회원가입단을 생성해 보세요.
		return service.delete(email);
	}

	@PutMapping("/account/update")
	@ApiOperation(value = "수정하기")
	public Object update(@RequestBody User request) {
		return service.update(request);
	}

	@GetMapping("/account/list")
	@ApiOperation(value = "유저보기")
	public Object selectAll() {

		return service.selectAll();
	}

}
