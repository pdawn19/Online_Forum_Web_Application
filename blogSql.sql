select * from blogtable;
select * from sessions;
select * from usertable;
ALTER TABLE usertable MODIFY id int NOT NULL AUTO_INCREMENT;
ALTER TABLE blogtable MODIFY blogID int NOT NULL AUTO_INCREMENT;
INSERT INTO blogtable values(1, 'PP', 'pps1stpost','peepee is hot', '2/2/2000');