import React from 'react';
import SectionTitle from './SectionTitle';

const Portfolio = ({ portfolio }) => {
  let portfolioContent = portfolio.map((item, index) =>
    index % 2 === 0 && window.innerWidth > 767 ? (
      <div key={item._id} className=' portfolio-item my-1'>
        <div className='portfolio-image'>
          <img src={item.appScreenshot} alt={item.appTitle} />
        </div>
        <div className='portfolio-content '>
          <h4 className='text-primary display-2'>{item.appTitle}</h4>
          <p className='text-color my-0 display-1'>{item.appInfo}</p>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h4 className='text-primary display-1'>Category </h4>
            <p className='text-color display-1'>&nbsp;- {item.appCategory}</p>
          </div>
          <h4 className='text-primary display-1 '>Skills</h4>
          <p className='text-color display-1 my-0'>
            {item.appSkills.join(' • ')}
          </p>
        </div>
      </div>
    ) : (
      <div key={item._id} className=' portfolio-item my-1'>
        <div className='portfolio-content '>
          <h4 className='text-primary display-2'>{item.appTitle}</h4>
          <p className='text-color my-0 display-1'>{item.appInfo}</p>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h4 className='text-primary display-1'>Category </h4>
            <p className='text-color display-1'>&nbsp;- {item.appCategory}</p>
          </div>
          <h4 className='text-primary display-1 '>Skills</h4>
          <p className='text-color display-1 my-0'>
            {item.appSkills.join(' • ')}
          </p>
        </div>
        <div className='portfolio-image'>
          <img src={item.appScreenshot} alt={item.appTitle} />
        </div>
      </div>
    )
  );

  return (
    <div id='work' className='container'>
      <SectionTitle title='Portfolio' subtitle='wat ik maak' />
      {portfolioContent.length !== 0 ? (
        portfolioContent
      ) : (
        <p className='text-color text-center display-1'>Add your best work</p>
      )}
    </div>
  );
};

export default Portfolio;