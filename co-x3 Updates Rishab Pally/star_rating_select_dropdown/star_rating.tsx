import React from 'react';

interface StarRating{
    averageRating: number;
    totalstars?: number;
}
  
class StarRating extends React.Component<StarRating, {}>
  {
    render() {
      const { averageRating, totalstars= 5 }= this.props;
      const stars_filled= Math.round(averageRating* totalstars)/ totalstars;
      const starcalc= stars_filled/ totalstars;
      const star_fill_ratio= starcalc* 100;
      const star_roundup= Math.floor(stars_filled);
  
        let stars= [];
        for(let i= 0; i <totalstars; i++)
        {
        if(i<stars_filled)
            {
                stars.push(<span key={i} className={`star filled`}>⭐</span>);
            }
        else if (i===star_roundup)
            {
                stars.push(<span key={i} className={`star partial`} style={{ width: `${star_fill_ratio}%` }}>⭐</span>);
            }
        else{
                stars.push(<span key={i} className="star">☆</span>);
            }
        }
  
        return
        (
        <div>
            {stars} ({averageRating.toFixed(1)})
        </div>
        );
    }
  }