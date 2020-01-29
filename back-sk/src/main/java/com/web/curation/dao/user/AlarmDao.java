package com.web.curation.dao.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.user.Alarm;

public interface AlarmDao extends JpaRepository<Alarm, Long> {
	
}
