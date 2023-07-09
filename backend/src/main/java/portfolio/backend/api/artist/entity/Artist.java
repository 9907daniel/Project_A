package portfolio.backend.api.artist.entity;

import org.springframework.format.annotation.DateTimeFormat;
import portfolio.backend.authentication.api.entity.user.User;
//import portfolio.backend.api.auth.entity.SiteUser;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="artists")
public class Artist {
//    @Lob
//    private byte[] additionalImage;
//    @Lob
//    private byte[] portfolio;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artistId;

    @Column(nullable=false)
    private String projectName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer liked;

    @Column(nullable=false)
    private String creatorArtCategory;

    @Column(nullable=true)
    private String interestCategory;

    @Column(nullable=true)
    private String snsLink;

    @Lob
    private byte[] mainImage;

    @Column(nullable=true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate birthdate;

    public void setUser(User user) {
        this.user = user;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLiked() {
        return liked;
    }

    public void setLiked(Integer liked) {
        this.liked = liked;
    }

    public String getCreatorArtCategory() {
        return creatorArtCategory;
    }

    public void setCreatorArtCategory(String creatorArtCategory) {
        this.creatorArtCategory = creatorArtCategory;
    }

    public String getInterestCategory() {
        return interestCategory;
    }

    public void setInterestCategory(String interestCategory) {
        this.interestCategory = interestCategory;
    }

    public String getSnsLink() {
        return snsLink;
    }

    public void setSnsLink(String snsLink) {
        this.snsLink = snsLink;
    }

    public byte[] getMainImage() {
        return mainImage;
    }

    public void setMainImage(byte[] mainImage) {
        this.mainImage = mainImage;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

}
