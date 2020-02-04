package com.web.curation.dao.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.user.Review;
import com.web.curation.model.user.Store;
import com.web.curation.model.user.User;

public interface ReviewDao extends JpaRepository<Review, Long> {
	Review findByRnum(long rnum);
	
	Review findAllByStoreAndUser(Store store, User user);
}
