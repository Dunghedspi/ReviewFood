package com.soict.reviewshopfood.service;


import java.sql.SQLException;
import java.util.List;

import com.soict.reviewshopfood.entity.User;
import com.soict.reviewshopfood.model.FormShopModel;
import com.soict.reviewshopfood.model.UserModel;

public interface IUserService {

	public User addUser(UserModel user) throws SQLException;                    //dang ki thanh vien
	public List<UserModel> getListUser() throws SQLException;//lay danh sach user theo role
	UserModel findByEmailAfterLogin(String email) throws SQLException;				//Tim user theo email
	public boolean checkLogin(User user) throws SQLException;                    	//Kiem tra email va password
	//void applyNewPassword(User user)	throws SQLException;						//Cap nhat lai password
	UserModel getUserById(int id) throws SQLException;                            	//Lay user theo id
	void blockOrUnblockUser(int id, boolean active) throws SQLException;             //Admin khoa/mo tai khoan nguoi dung
	boolean editUser(UserModel user, String email) throws SQLException;
	public User findByEmail(String email) throws SQLException;                    //Tim user theo email
	void applyNewPassword(User user) throws SQLException;//Cap nhat lai password
	UserModel getUserByEmail(String email);
	void updateUser(User user);
	boolean registerShop(FormShopModel formShopModel);
}