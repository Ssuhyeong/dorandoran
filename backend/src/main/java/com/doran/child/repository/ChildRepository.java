package com.doran.child.repository;

import com.doran.child.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child,Integer>, ChildRepositoryCustom {
}
