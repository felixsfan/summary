import beans.NewsLabel;
import dao.INewsLabelDao;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import utils.MyBatisUtils;

import java.util.List;
public class MyTest {
  private INewsLabelDao dao;
  private SqlSession sqlSession;
  @Before
  public void Before(){
    sqlSession=MyBatisUtils.getSqlSession();
    dao=sqlSession.getMapper(INewsLabelDao.class);
  }
  @Test
  public void TestselectMinisterById(){
    NewsLabel children=dao.selectParentByParentId(7);

    System.out.println(children);

  }
  @After
  public void after(){
    if(sqlSession!=null){
      sqlSession.close();
    }
  }

}
